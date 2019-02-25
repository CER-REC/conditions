/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
import React from 'react';
import classNames from 'classnames';
import Matter from 'matter-js';
import { keywordList } from '../proptypes';
import {
  circleCategory,
  placeholderCategory,
  resettingCategory,
  visibleTextCategory,
} from './categories';

export default class PhysicsVariant extends React.Component {
  static propTypes = {
    keywords: keywordList.isRequired,
  };

  constructor(props) {
    super(props);
    this.groupRef = React.createRef();
    const world = Matter.World.create({ gravity: { x: 0, y: 0 } });
    this.engine = Matter.Engine.create({ world });
    this.lastTime = null;
    this.loopID = null;
    this.deltaTime = 0;
    this.correction = 1;
    this.timeScale = 1000;

    // Set up bodies
    // changed from -200 to 200 to deal with loading bug in storybook
    this.circle = Matter.Bodies.circle(200, 200, 50, {
      collisionFilter: {
        category: circleCategory,
      },
    });
    Matter.Body.setMass(this.circle, 1);
    Matter.World.add(this.engine.world, this.circle);

    this.keywords = {};
    this.props.keywords.forEach((keyword) => {
      const { outline } = keyword;
      const position = this.calculatePosition(keyword);
      const keywordBody = Matter.Bodies.rectangle(
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
      keywordBody.frictionAir = 0.16;
      keywordBody.render.className = keyword.className;
      keywordBody.render.value = keyword.value;
      keywordBody.render.originalData = keyword;
      keywordBody.render.textOffset = this.calculateTextOffset(keyword);

      this.keywords[keyword.value] = keywordBody;
    });
    Matter.World.add(this.engine.world, Object.values(this.keywords));
    Matter.Engine.run(this.engine);
  }

  componentDidMount() {
    //  disable applied force to help with loading bug
    // Matter.Body.applyForce(this.circle, this.circle.position, { x: 0.15, y: 0.005 });

    const mouse = Matter.Mouse.create(this.groupRef.current.parentElement);
    // mouse constrain needs ot be changed so it has a static center and doesn't drift
    const mouseConstraint = Matter.MouseConstraint.create(this.engine, {
      mouse,
      constraint: {
        damping: 0.1,
        anchors: false,
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });
    this.mouse = mouse;

    Matter.World.add(this.engine.world, mouseConstraint);
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, this.engine);
    Matter.Events.on(this.engine, 'afterUpdate', this.onUpdate);
    Matter.Events.on(this.engine, 'collisionStart', this.onCollision);
    this.loop(window.performance.now());
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.loopID);
    Matter.Events.off(this.engine, 'afterUpdate', this.onUpdate);
    Matter.Events.off(this.engine, 'collisionStart', this.onCollision);
  }

  onUpdate = (update) => {
    let bodiesChanged = false;
    Matter.Composite.allBodies(this.engine.world).forEach((body) => {
      let bodyChanged = (Math.abs(body.position.x - body.positionPrev.x) > 0.01)
        || (Math.abs(body.position.y - body.positionPrev.y) > 0.01)
        || ((Math.abs(body.angle - body.anglePrev) * 180) / Math.PI > 0.01);
      // Check if any positions have updated
      bodiesChanged = bodiesChanged || bodyChanged;
      if (bodyChanged <= 0.01) bodyChanged = 0;
      // If the circle has stopped moving, increase its friction
      if (body.collisionFilter.category === circleCategory && !bodiesChanged) {
        body.frictionAir = 0.2;
      }

      if (body.collisionFilter.category === resettingCategory && !bodiesChanged) {
        body.collisionFilter.category = placeholderCategory;
      }
      // Check if any keywords that have been displaced can move back
      if (body.collisionFilter.category === visibleTextCategory
        && body.render.lastCollision + 2633 <= update.source.timing.timestamp) {
      // eslint-disable-next-line object-curly-newline
        const { x, y, width, height } = body.render.originalData.outline;
        const originalBounds = {
          min: { x, y },
          max: { x: x + width, y: y + height },
        };
        if (Matter.Bounds.overlaps(originalBounds, this.circle.bounds) === false) {
          body.collisionFilter.category = resettingCategory;
          body.collisionFilter.mask &= ~visibleTextCategory;
          this.resetBodyPosition(body);
        }
      }
    });
  };

  onCollision = collision => collision.pairs.forEach((pair) => {
    const withCircle = pair.bodyA === this.circle || pair.bodyB === this.circle;
    pair.bodyA.render.lastCollision = collision.source.timing.timestamp;
    pair.bodyB.render.lastCollision = collision.source.timing.timestamp;
    // Collisions between keywords will allow movement, but not extend the
    // time until they go back to their original positions
    if (!withCircle) { return; }

    const keyword = pair.bodyA === this.circle ? pair.bodyB : pair.bodyA;

    if (keyword.collisionFilter.category === resettingCategory) {
      pair.isActive = false;
      return;
    }
    keyword.collisionFilter.category = visibleTextCategory;
    keyword.collisionFilter.mask |= visibleTextCategory;
  });

  loop = (currTime) => {
    const time = currTime / this.timeScale;
    this.deltaTime = time - this.lastTime;
    Matter.Engine.update(
      this.engine,
      this.timeScale / this.deltaTime,
      this.lastTime ? currTime / this.lastTime : this.correction,
    );
    this.lastTime = currTime;
    this.loopID = window.requestAnimationFrame(this.loop);
    this.forceUpdate();
  }

  resetBodyPosition = (body) => {
    const targetPos = this.calculatePosition(body.render.originalData);
    const frictionAir = 1 - body.frictionAir;

    const velocity = {
      x: this.calculateVelocity(body.position.x, targetPos.x, frictionAir),
      y: this.calculateVelocity(body.position.y, targetPos.y, frictionAir),
    };
    Matter.Body.setVelocity(body, velocity);

    const angleVelocity = this.calculateVelocity(body.angle, 0, frictionAir);
    Matter.Body.setAngularVelocity(body, angleVelocity);

    setTimeout(() => {
      Matter.Body.setVelocity(body, { x: 0, y: 0 });
      Matter.Body.setPosition(body, targetPos);
      Matter.Body.setAngularVelocity(body, 0);
      Matter.Body.setAngle(body, 0);
    }, 666);
  };

  calculatePosition = (keyword) => {
    const word = {
      x: keyword.outline.x + (keyword.outline.width / 2),
      y: keyword.outline.y + (keyword.outline.height / 2),
    };
    return word;
  };

  calculateTextOffset = (keyword) => {
    const word = {
      x: keyword.textOffset.x,
      y: keyword.textOffset.y - (keyword.outline.height / 2),
    };
    return word;
  };

  calculateVelocity = (start, end, friction) => {
    let loop = 0;
    let current = start;
    let prev = start + ((start - end) / this.timeScale);
    const direction = Math.abs(start - end) / (start - end);
    while ((current - end) * direction > 0 && loop < 100) {
      loop += 1;
      const velocity = (current - prev) / friction;
      prev = current;
      current += velocity;
    }
    return current - prev;
  };

  isWordVisible = keyword => (keyword.collisionFilter.category !== placeholderCategory);

  getBodies = () => {
    const bodies = Matter.Composite.allBodies(this.engine.world)
      .sort((a, b) => {
        if (this.isWordVisible(a) && !this.isWordVisible(b)) { return 1; }
        if (this.isWordVisible(b) && !this.isWordVisible(a)) { return -1; }
        return 0;
      });
    return bodies;
  }

  // TODO: optimize the nested map functions
  getWords = () => {
    const bodies = this.getBodies();
    const words = bodies.map((body) => {
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
            { textVisible: this.isWordVisible(body) },
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
    return words;
  }

  after() {
    window.cancelAnimationFrame(this.loopID);
  }

  render() {
    return (
      <g ref={this.groupRef}>
        {this.getWords()}
      </g>
    );
  }
}
