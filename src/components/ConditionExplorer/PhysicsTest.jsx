/* eslint-disable no-bitwise */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowequal from 'shallowequal';
import Matter, { Bodies, Composite, Engine, Events, Mouse, MouseConstraint, World } from 'matter-js';
import { keywordList } from './proptypes';
import './styles.scss';

const circleCategory = Matter.Body.nextCategory();
const visibleTextCategory = Matter.Body.nextCategory();
const placeholderCategory = Matter.Body.nextCategory();

const calculatePosition = keyword => ({
  x: keyword.outline.x + (keyword.outline.width / 2),
  y: keyword.outline.y + (keyword.outline.height / 2),
});

const calculateTextOffset = keyword => ({
  x: keyword.textOffset.x,
  y: keyword.textOffset.y - (keyword.outline.height / 2),
});

const isVisible = keyword => (keyword.collisionFilter.category === visibleTextCategory);

const calculateVelocity = (start, end, friction) => {
  let loop = 0;
  let current = start;
  let prev = start + ((start - end) / 1000);
  const direction = Math.abs(start - end) / (start - end);
  // console.log(direction, current, end, current - end)
  while ((current - end) * direction > 0 && loop < 100) {
    loop += 1;
    const velocity = (current - prev) / friction;
    prev = current;
    current += velocity;
  }
  return current - prev;
};

export default class PhysicsTest extends React.Component {
  static propTypes = {
    keywords: keywordList.isRequired,
  };

  constructor(props) {
    super(props);

    this.groupRef = React.createRef();

    const world = Matter.World.create({ gravity: { x: 0, y: 0 } });
    this.engine = Engine.create({ world });
    this.lastTime = null;
    this.loopID = null;

    // Set up bodies
    this.circle = Bodies.circle(-100, 200, 50, {
      collisionFilter: {
        category: circleCategory,
      },
    });
    World.add(this.engine.world, this.circle);

    this.keywords = {};
    this.props.keywords.forEach((keyword) => {
      const { outline } = keyword;
      const position = calculatePosition(keyword);
      const keywordBody = Bodies.rectangle(
        position.x,
        position.y,
        outline.width,
        outline.height,
        {
          collisionFilter: {
            category: placeholderCategory,
            mask: circleCategory,
          },
        },
      );
      keywordBody.frictionAir = 0.05;
      keywordBody.render.className = keyword.className;
      keywordBody.render.value = keyword.value;
      keywordBody.render.originalData = keyword;
      keywordBody.render.textOffset = calculateTextOffset(keyword);

      this.keywords[keyword.value] = keywordBody;
    });
    World.add(this.engine.world, Object.values(this.keywords));

    Engine.run(this.engine);
  }

  componentDidMount() {
    Matter.Body.applyForce(this.circle, this.circle.position, { x: 0.3, y: 0.01 });

    const mouse = Mouse.create(this.groupRef.current.parentElement);
    const mouseConstraint = MouseConstraint.create(this.engine, {
      mouse,
      // collisionFilter: { mask: circleCategory },
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });
    this.mouse = mouse;

    World.add(this.engine.world, mouseConstraint);

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, this.engine);

    Events.on(this.engine, 'afterUpdate', this.onUpdate);
    Events.on(this.engine, 'collisionStart', this.onCollision);
    this.loop();
  }

  componentDidUpdate(prevProps) {
    // TODO: This seems like a really bad place to put this logic.
    // If the font measurement has changed, we need to update the dimensions
    // of each of the keyword bars
    if (!shallowequal(prevProps.fontMeasurement, this.props.fontMeasurement)) {
      const keywordsToDelete = Object.keys(this.keywords);
      let needsUpdate = false;
      this.props.keywords.forEach((keyword) => {
        const keywordBody = this.keywords[keyword.value];
        if (!keywordBody) {
          // TODO: Create it
          return;
        }

        // Remove it from the unseen array
        keywordsToDelete.splice(keywordsToDelete.indexOf(keyword.value), 1);

        if (keywordBody.area === keyword.outline.width * keyword.outline.height) {
          return;
        }

        const oldAngle = keywordBody.angle;
        Matter.Body.setAngle(keywordBody, 0);
        const oldWidth = keywordBody.bounds.max.x - keywordBody.bounds.min.x;
        const oldHeight = keywordBody.bounds.max.y - keywordBody.bounds.min.y;
        Matter.Body.scale(
          keywordBody,
          keyword.outline.width / oldWidth,
          keyword.outline.height / oldHeight,
        );
        Matter.Body.setPosition(keywordBody, calculatePosition(keyword));
        Matter.Body.setAngle(keywordBody, oldAngle);
        keywordBody.render.originalData = keyword;
        keywordBody.render.textOffset = calculateTextOffset(keyword);
        needsUpdate = true;
      });

      // TODO: Remove the old keywords that aren't needed anymore

      if (needsUpdate) { this.forceUpdate(); }
    }
  }

  componentWillUnmount() {
    Events.off(this.engine, 'afterUpdate', this.onUpdate);
    Events.off(this.engine, 'collisionStart', this.onCollision);
    window.cancelAnimationFrame(this.loopID);
  }

  onUpdate = (update) => {
    let bodiesChanged = false;
    Composite.allBodies(this.engine.world).forEach((body) => {
      if (!bodiesChanged) {
        // Check if any positions have updated
        bodiesChanged = (Math.abs(body.position.x - body.positionPrev.x) > 0.01)
          || (Math.abs(body.position.y - body.positionPrev.y) > 0.01)
          || ((Math.abs(body.angle - body.angle) * 180) / Math.PI > 0.01);
      }

      // Check if any keywords that have been displaced can move back
      if (body.collisionFilter.category === visibleTextCategory
          && body.render.lastCollision + 2000 <= update.source.timing.timestamp) {
        // eslint-disable-next-line object-curly-newline
        const { x, y, width, height } = body.render.originalData.outline;
        const originalBounds = {
          min: { x, y },
          max: { x: x + width, y: y + height },
        };
        if (Matter.Bounds.overlaps(originalBounds, this.circle.bounds) === false) {
          body.collisionFilter.category = placeholderCategory;
          body.collisionFilter.mask &= ~visibleTextCategory;
          this.resetBodyPosition(body);
        }
      }
    });
    if (bodiesChanged) { this.setState({}); }
  };

  onCollision = collision => collision.pairs.forEach((pair) => {
    const withCircle = pair.bodyA === this.circle || pair.bodyB === this.circle;
    pair.bodyA.render.lastCollision = collision.source.timing.timestamp;
    pair.bodyB.render.lastCollision = collision.source.timing.timestamp;
    // Collisions between keywords will allow movement, but not extend the
    // time until they go back to their original positions
    if (!withCircle) { return; }

    const keyword = pair.bodyA === this.circle ? pair.bodyB : pair.bodyA;
    keyword.collisionFilter.category = visibleTextCategory;
    keyword.collisionFilter.mask |= visibleTextCategory;
  });

  loop = () => {
    const currTime = 0.001 * Date.now();
    Engine.update(
      this.engine,
      1000 / 60,
      this.lastTime ? currTime / this.lastTime : 1,
    );
    this.lastTime = currTime;
    this.loopID = window.requestAnimationFrame(this.loop);
  }

  resetBodyPosition = (body) => {
    const targetPos = calculatePosition(body.render.originalData);
    const frictionAir = 1 - body.frictionAir;

    const velocity = {
      x: calculateVelocity(body.position.x, targetPos.x, frictionAir),
      y: calculateVelocity(body.position.y, targetPos.y, frictionAir),
    };
    Matter.Body.setVelocity(body, velocity);

    const angleVelocity = calculateVelocity(body.angle, 0, frictionAir);
    Matter.Body.setAngularVelocity(body, angleVelocity);

    // TODO: Temporary placeholder to make sure they snap to the correct spot
    setTimeout(() => {
      Matter.Body.setPosition(body, targetPos);
      Matter.Body.setAngle(body, 0);
      this.forceUpdate();
    }, 2000);
  };

  render() {
    const bodies = Composite.allBodies(this.engine.world)
      .sort((a, b) => {
        if (isVisible(a) && !isVisible(b)) { return 1; }
        if (isVisible(b) && !isVisible(a)) { return -1; }
        return 0;
      })
      .map((body) => {
        const d = body.vertices
          .concat(body.vertices[0]) // Add it onto the end so we create a full path
          .map((v, i) => `${i === 0 ? 'M' : 'L'} ${v.x} ${v.y}`)
          .join(' ');
        if (body === this.circle) {
          return <path key="guide" className="guide" d={d} />;
        }

        return (
          <g
            key={body.id}
            className={classNames(
              'keyword',
              body.render.className,
              { textVisible: isVisible(body) },
            )}
          >
            <text
              x={body.position.x + body.render.textOffset.x}
              y={body.position.y + body.render.textOffset.y}
              transform={`rotate(${body.angle * 180 / Math.PI} ${body.position.x} ${body.position.y})`}
            >
              {body.render.value}
            </text>
            <path d={d} />
          </g>
        );
      });
    return (
      <g ref={this.groupRef}>
        {bodies}
      </g>
    );
  }
}
