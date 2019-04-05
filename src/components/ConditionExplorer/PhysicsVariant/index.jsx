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
import Body from './Body';
import Keyword from './Keyword';

const conditionViewerOptions = {
  keywordReturnSpeed: 2,
  circleCenterSpeed: 2,
  circleIncreaseScale: 1.2,
  circleBaseRadius: 50,
};

// Found at https://gist.github.com/gre/1650294
const easeOutCubic = t => ((--t) * t * t) + 1; // eslint-disable-line no-plusplus
export default class PhysicsVariant extends React.PureComponent {
  static propTypes = {
    keywords: keywordList.isRequired,
  };

  constructor(props) {
    super(props);
    this.groupRef = React.createRef();
    this.loopID = null;
    this.lastTime = 0;
    this.lastDeltaTime = 0;
    this.locationBeforeExpand = { x: 0, y: 0 };
    this.keywordsCanReset = true;
    this.state = { renderToggle: false };
  }

  componentDidMount() {
    const world = Matter.World.create({ gravity: { x: 0, y: 0 } });
    this.engine = Matter.Engine.create({ world });

    // Set up bodies
    const radius = conditionViewerOptions.circleBaseRadius;
    this.circle = Matter.Bodies.polygon(200, 200, 100, radius, {
      collisionFilter: { category: circleCategory },
    });
    this.circle.frictionAir = 0.2;
    this.circle.render.targetRadius = radius;
    this.circleBody = new Body(this.circle);

    this.keywords = {};
    this.keywordsBody = {};
    /*
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
      this.keywordsBody[keyword.value] = new Keyword(keywordBody);
    });
    */

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

  moveBodyToTarget = (body, speed) => {
    const newVelocity = { ...body.velocity };
    const { targetPos } = body.render;
    newVelocity.x = this.calculateVelocity(body.position.x, targetPos.x, speed);
    newVelocity.y = this.calculateVelocity(body.position.y, targetPos.y, speed);
    Matter.Body.setVelocity(body, newVelocity);
    Matter.Body.setAngularVelocity(body, this.calculateVelocity(body.angle, 0, speed));
  }

  getCenterCoordinates = () => ({
    x: this.groupRef.current.parentElement.width.baseVal.value / 2,
    y: this.groupRef.current.parentElement.height.baseVal.value / 2,
  });

  onUpdate = (update) => {
    // TODO: Separate circle from keywords
    Object.values(this.keywordsBody).concat(this.circleBody).forEach((bodyInstance) => {
      bodyInstance.onUpdate(update);
      const { body } = bodyInstance;

      if (bodyInstance.category === visibleTextCategory
        && body.render.lastCollision + 5000 <= update.source.timing.timestamp
        && this.keywordsCanReset) {
      // eslint-disable-next-line object-curly-newline
        const { x, y, width, height } = body.render.originalData.outline;
        const originalBounds = {
          min: { x, y },
          max: { x: x + width, y: y + height },
        };
        if (Matter.Bounds.overlaps(originalBounds, this.circle.bounds) === false) {
          bodyInstance.category = resettingCategory;
          bodyInstance.removeCollisionMask(visibleTextCategory);
        }
      } else if (body.collisionFilter.category === resettingCategory) {
        body.render.targetPos = this.calculatePosition(body.render.originalData);
      }

      // If the body has a target position, begin moving it to that spot
      if (body.render.targetPos) {
        const {
          circleIncreaseScale,
          keywordReturnSpeed,
          circleCenterSpeed,
        } = conditionViewerOptions;
        const moveSpeed = body === this.circle ? circleCenterSpeed : keywordReturnSpeed;
        this.moveBodyToTarget(body, moveSpeed);
      }

      // Adjust the scale of the circle
        /*
      if (body === this.circle) {
        const radius = (body.bounds.max.x - body.bounds.min.x) / 2;
        if (Math.abs(body.render.targetRadius - radius) > 1) {
          let scaleVelocity = this.calculateVelocity(radius, body.render.targetRadius, 1.01, 1);
          while (scaleVelocity < 0) { scaleVelocity += 1; }
          Matter.Body.scale(this.circle, scaleVelocity, scaleVelocity);
        }
      }
      */
    });
  };

  onCollision = collision => collision.pairs.forEach((pair) => {
    const withCircle = pair.bodyA === this.circle || pair.bodyB === this.circle;
    pair.bodyA.render.lastCollision = collision.source.timing.timestamp;
    pair.bodyB.render.lastCollision = collision.source.timing.timestamp;
    // Collisions between keywords will allow movement, but not extend the
    // time until they go back to their original positions
    if (!withCircle) { return; }

    const keyword = (pair.bodyA === this.circle ? pair.bodyB : pair.bodyA).render.wrapper;

    if (keyword.category === resettingCategory) {
      pair.isActive = false;
      return;
    }
    keyword.category = visibleTextCategory;
    keyword.addCollisionMask(visibleTextCategory);
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
    this.setState(state => ({ renderToggle: !state.renderToggle }));
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

  calculateVelocity = (start, end, speed = 2, slowWithin = 100) => {
    const distance = end - start;
    if (distance === 0) { return 0; }
    const distanceScale = Math.min(Math.abs(distance) / slowWithin, 1);
    const direction = distance / Math.abs(distance);
    return easeOutCubic(distanceScale) * direction * speed;
  };

  isWordVisible = keyword => (keyword.collisionFilter.category !== placeholderCategory);

  sortBodies = () => {
    const bodies = Matter.Composite.allBodies(this.engine.world)
      .sort((a, b) => {
        if (this.isWordVisible(a) && !this.isWordVisible(b)) { return 1; }
        if (this.isWordVisible(b) && !this.isWordVisible(a)) { return -1; }
        return 0;
      });
    return bodies;
  }

  openGuide = (e) => {
    if (this.circle.speed || this.circle.render.expanded) { return; }
    e.stopPropagation();
    this.locationBeforeExpand = { x: this.circle.position.x, y: this.circle.position.y };
    // this.circle.render.targetPos = this.getCenterCoordinates();
    this.circleBody.moveTo(this.getCenterCoordinates().x, this.getCenterCoordinates().y, 100);
    const dimensions = this.getCenterCoordinates();
    this.circle.render.targetRadius = Math.min(dimensions.x, dimensions.y);
    this.circle.render.expanded = true;
    this.keywordsCanReset = false;
    Object.values(this.keywordsBody).forEach((body) => {
      body.removeCollisionMask(circleCategory);
    });
  }

  closeGuide = () => {
    this.circle.render.targetPos = this.locationBeforeExpand;
    this.circle.render.targetRadius = conditionViewerOptions.circleBaseRadius;
    this.circle.render.expanded = false;
  }

  // TODO: optimize the nested map functions
  renderBodies = () => {
    if (!this.engine || !this.engine.world) { return null; }
    const bodies = this.sortBodies();
    const words = bodies.map((body) => {
      const d = body.vertices
        .concat(body.vertices[0]) // Add it onto the end so we create a full path
        .map((v, i) => `${i === 0 ? 'M' : 'L'} ${v.x} ${v.y}`)
        .join(' ');
      if (body === this.circle) {
        return <path key="guide" className="guide" d={d} onClick={this.openGuide} />;
      }
      return (
        <g
          key={body.id}
          className={classNames(
            'keyword',
            body.render.className,
            { textVisible: this.isWordVisible(body) },
          )}
          onClick={null/*this.closeGuide*/}
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
      <g ref={this.groupRef} onClick={this.closeGuide}>
        {/* This is to ensure the group is always clickable */}
        <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
        {this.renderBodies()}
      </g>
    );
  }
}
