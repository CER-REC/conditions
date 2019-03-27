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

// Found at https://gist.github.com/gre/1650294
const easeOutCubic = t => ((--t) * t * t) + 1; // eslint-disable-line no-plusplus

export default class PhysicsVariant extends React.Component {
  static propTypes = {
    keywords: keywordList.isRequired,
  };

  constructor(props) {
    super(props);
    this.groupRef = React.createRef();
    this.loopID = null;
    this.lastTime = 0;
    this.lastDeltaTime = 0;

    this.middleY = 0;
    this.middleX = 0;
    this.clickAdded = false;
    this.showExplainer = false;
    this.initialTime = 0;
  }

  componentDidMount() {
    const world = Matter.World.create({ gravity: { x: 0, y: 0 } });
    this.engine = Matter.Engine.create({ world });

    // Set up bodies
    this.circle = Matter.Bodies.circle(200, 200, 50, {
      collisionFilter: { category: circleCategory },
    });

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
      keywordBody.frictionAir = 0.05;
      keywordBody.render.className = keyword.className;
      keywordBody.render.value = keyword.value;
      keywordBody.render.originalData = keyword;
      keywordBody.render.textOffset = this.calculateTextOffset(keyword);

      this.keywords[keyword.value] = keywordBody;
    });

    // Add bodies to world
    Matter.World.add(this.engine.world, this.circle);
    Matter.World.add(this.engine.world, Object.values(this.keywords));

    //  disable applied force to help with loading bug
    // Matter.Body.applyForce(this.circle, this.circle.position, { x: 0.15, y: 0.005 });

    const mouse = Matter.Mouse.create(this.groupRef.current.parentElement);

    const mouseConstraint = Matter.MouseConstraint.create(this.engine, {
      mouse,
      constraint: { render: { visible: true } },
    });
    this.mouse = mouse;
    this.constraint = mouseConstraint;

    Matter.World.add(this.engine.world, mouseConstraint);

    Matter.Engine.run(this.engine);
    Matter.Events.on(this.engine, 'afterUpdate', this.onUpdate);
    Matter.Events.on(this.engine, 'collisionStart', this.onCollision);
    Matter.Runner.run(Matter.Runner.create(), this.engine);
    this.initialTime = window.performance.now();
    this.loop(window.performance.now());
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.loopID);
    Matter.Events.off(this.engine, 'afterUpdate', this.onUpdate);
    Matter.Events.off(this.engine, 'collisionStart', this.onCollision);
    // TODO: Is there any other cleanup that should be done for Matter.js?
    // It seems like all of the matter elements will reference each other, and
    // will result in a memory leak.
  }

  onUpdate = (update) => {
    const now = window.performance.now();
    Matter.Composite.allBodies(this.engine.world).forEach((body) => {
      // Stop the body from moving if its reached a minimum movement
      if (!this.showExplainer) Matter.Sleeping.set(body, false);
      const newVelocity = { ...body.velocity };
      if (Math.abs(body.position.x - body.positionPrev.x) < 0.01) { newVelocity.x = 0; }
      if (Math.abs(body.position.y - body.positionPrev.y) < 0.01) { newVelocity.y = 0; }
      if (newVelocity.x !== body.velocity.x || newVelocity.y !== body.velocity.y) {
        Matter.Body.setVelocity(body, newVelocity);
      }

      if ((Math.abs(body.angle - body.anglePrev) * 180) / Math.PI > 0.01) {
        Matter.Body.setAngularVelocity(0);
      }


      // Check if the body is still moving
      const bodyChanged = !!(body.speed || body.angularSpeed);

      if (body === this.circle && bodyChanged && this.showExplainer === true) {
        // this.showExplainer = false;
        // Matter.Events.off(this.constraint, 'mousedown');
        // this.clickAdded = false;
      }

      // && Math.abs(this.initialTime - now) > 5000   && !bodyChanged
      if (!this.showExplainer && body === this.circle) {
        this.initialTime = now;
        Matter.Events.on(this.constraint, 'startdrag', () => {
          this.middleY = Math.abs(
            this.groupRef.current.parentElement.height.baseVal.value / 2
          );
          this.middleX = Math.abs(
            this.groupRef.current.parentElement.width.baseVal.value / 2
          );
         // Matter.Body.setStatic(this.circle, 1);
         // if (this.circle.circleRadius <= 50) Matter.Body.scale(this.circle, 5, 5);
         // Matter.Body.setPosition(this.circle, { x: this.middleX, y: this.middleY });
        });
        this.clickAdded = true;
      }

      // If the circle has stopped moving, increase its friction
      if (body.collisionFilter.category === circleCategory && !bodyChanged) {
        body.frictionAir = 0.2;
      }

      if (body.collisionFilter.category === resettingCategory && !bodyChanged) {
        body.collisionFilter.category = placeholderCategory;
        const targetPos = this.calculatePosition(body.render.originalData);
        // Ensure everything is in the correct position
        Matter.Body.setVelocity(body, { x: 0, y: 0 });
        Matter.Body.setPosition(body, targetPos);
        Matter.Body.setAngularVelocity(body, 0);
        Matter.Body.setAngle(body, 0);
      }

      // Check if any keywords that have been displaced can move back
      if (body.collisionFilter.category === visibleTextCategory
          && body.render.lastCollision + 5000 <= update.source.timing.timestamp && !this.showExplainer) {
        // eslint-disable-next-line object-curly-newline
        const { x, y, width, height } = body.render.originalData.outline;
        const originalBounds = {
          min: { x, y },
          max: { x: x + width, y: y + height },
        };
        if (Matter.Bounds.overlaps(originalBounds, this.circle.bounds) === false) {
          body.collisionFilter.category = resettingCategory;
          body.collisionFilter.mask &= ~visibleTextCategory;
        }
      } else if (body.collisionFilter.category === resettingCategory) {
        // use these functions ot calc the way to the middle
        const targetPos = this.calculatePosition(body.render.originalData);
        newVelocity.x = this.calculateVelocity(body.position.x, targetPos.x);
        newVelocity.y = this.calculateVelocity(body.position.y, targetPos.y);
        Matter.Body.setVelocity(body, newVelocity);
        Matter.Body.setAngularVelocity(body, this.calculateVelocity(body.angle, 0));
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
    const deltaTime = currTime - (this.lastTime || 0);
    Matter.Engine.update(
      this.engine,
      this.deltaTime,
      this.lastDeltaTime ? (deltaTime / this.lastDeltaTime) : 1,
    );
    this.lastTime = currTime;
    this.lastDeltaTime = deltaTime;
    this.loopID = window.requestAnimationFrame(this.loop);
    this.forceUpdate();
  }

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

  calculateVelocity = (start, end) => {
    const distance = end - start;
    const distanceScale = Math.min(Math.abs(distance) / 100, 1);
    const direction = distance / Math.abs(distance);
    return easeOutCubic(distanceScale) * direction * 2;
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
    if (!this.engine || !this.engine.world) { return null; }
    const bodies = this.getBodies();
    const words = bodies.map((body) => {
      const d = body.vertices
        .concat(body.vertices[0]) // Add it onto the end so we create a full path
        .map((v, i) => `${i === 0 ? 'M' : 'L'} ${v.x} ${v.y}`)
        .join(' ');
      if (body === this.circle) {
        return <path key="guide" className="guide" d={d} />;
      }
     // console.log(body)
      const test = bodies.filter(b => this.isWordVisible(b) );
      if (test.render) console.log(test.render.originalData);
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

  render() {
    return (
      <g ref={this.groupRef}>
        {this.getWords()}
      </g>
    );
  }
}
