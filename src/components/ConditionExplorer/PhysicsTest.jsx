import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowequal from 'shallowequal';
import Matter, { Bodies, Composite, Engine, Events, Mouse, MouseConstraint, World } from 'matter-js';
import handleDrag from '../../utilities/handleDrag';
import { keywordList } from './proptypes';
import './styles.scss';

const circleCategory = 0x0002;
const visibleTextCategory = 0x0003;
const placeholderCategory = 0x0004;

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
        mask: visibleTextCategory | placeholderCategory,
      },
    });
    World.add(this.engine.world, this.circle);

    this.keywords = {};
    this.props.keywords.forEach((keyword) => {
      const { outline } = keyword;
      const keywordBody = Bodies.rectangle(
        outline.x + (outline.width / 2),
        outline.y + (outline.height / 2),
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
      keywordBody.render.textPosition = keyword.textPosition;
      keywordBody.render.value = keyword.value;
      keywordBody.render.textOffset = keyword.textOffset;

      this.keywords[keyword.value] = keywordBody;
    });
    World.add(this.engine.world, Object.values(this.keywords));

    Engine.run(this.engine);
  }

  componentDidMount() {
    // Matter.Body.applyForce(this.circle, this.circle.position, { x: 0.3, y: 0.01 });

    const mouse = Mouse.create(this.groupRef.current.parentElement);
    const mouseConstraint = MouseConstraint.create(this.engine, {
      mouse,
      collisionFilter: { mask: circleCategory },
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

        const oldWidth = keywordBody.bounds.max.x - keywordBody.bounds.min.x;
        const oldHeight = keywordBody.bounds.max.y - keywordBody.bounds.min.y;
        Matter.Body.scale(
          keywordBody,
          keyword.outline.width / oldWidth,
          keyword.outline.height / oldHeight,
        );
        Matter.Body.setPosition(keywordBody, {
          x: keyword.outline.x + (keyword.outline.width / 2),
          y: keyword.outline.y + (keyword.outline.height / 2),
        });
        keywordBody.render.textOffset = keyword.textOffset;
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

  onUpdate = () => {
    // Check if any positions have updated
    const bodiesMoved = Composite.allBodies(this.engine.world).find((body) => {
      if (Math.abs(body.position.x - body.positionPrev.x) > 0.01) { return true; }
      if (Math.abs(body.position.y - body.positionPrev.y) > 0.01) { return true; }
      return false;
    });
    if (bodiesMoved) { this.setState({}); }
  };

  onCollision = collision => collision.pairs.forEach((pair) => {
    const withCircle = pair.bodyA === this.circle || pair.bodyB === this.circle;
    // Collisions between keywords will allow movement, but not extend the
    // time until they go back to their original positions
    if (!withCircle) { return; }

    const keyword = pair.bodyA === this.circle ? pair.bodyB : pair.bodyA;
    keyword.render.isVisible = true;
    // keyword.collisionFilter.category = visibleTextCategory & placeholderCategory;
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

  render() {
    const bodies = Composite.allBodies(this.engine.world).map((body) => {
      const d = body.vertices.map((v, i) => `${i === 0 ? 'M' : 'L'} ${v.x} ${v.y}`).join(' ');
      if (body === this.circle) {
        return <path key="guide" className="guide" d={d} />;
      }

      return (
        <g
          key={body.id}
          className={classNames(
            'keyword',
            body.render.className,
            { textVisible: body.render.isVisible || true },
          )}
        >
          <text
            x={body.position.x + body.render.textOffset.x}
            y={body.position.y + body.render.textOffset.y}
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
