/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
import React from 'react';
import classNames from 'classnames';
import Matter from 'matter-js';
import { keywordList } from '../proptypes';
import {
  circleCategory,
  resettingCategory,
  mouseGrabCategory,
  visibleTextCategory,
} from './categories';
import Keyword from './Keyword';
import Guide from './Guide';

export default class PhysicsVariant extends React.PureComponent {
  static propTypes = {
    keywords: keywordList.isRequired,
  };

  constructor(props) {
    super(props);
    this.groupRef = React.createRef();
    this.loopID = null;
    this.lastTime = 0;
    this.selected = 0;
    this.lastDeltaTime = 0;
    this.state = { renderToggle: false };
  }

  componentDidMount() {
    const world = Matter.World.create({ gravity: { x: 0, y: 0 } });
    this.engine = Matter.Engine.create({ world });

    this.circle = new Guide(this.engine);
    this.keywords = this.props.keywords
      .map(keyword => new Keyword(keyword, this.engine));

    const mouseConstraint = Matter.MouseConstraint.create(this.engine, {
      mouse: Matter.Mouse.create(this.groupRef.current.parentElement),
      constraint: { render: { visible: false } },
      collisionFilter: { mask: mouseGrabCategory },
    });
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

  getCenterCoordinates = () => ({
    x: this.groupRef.current.parentElement.width.baseVal.value / 2,
    y: this.groupRef.current.parentElement.height.baseVal.value / 2,
  });

  onUpdate = (update) => {
    this.circle.onUpdate(update);
    this.keywords.forEach(keyword => keyword
      .onUpdate(update, !this.circle.isExpanded, this.circle.body.bounds));
  };

  onCollision = collision => collision.pairs.forEach((pair) => {
    const withCircle = pair.bodyA === this.circle.body || pair.bodyB === this.circle.body;
    pair.bodyA.render.lastCollision = collision.source.timing.timestamp;
    pair.bodyB.render.lastCollision = collision.source.timing.timestamp;
    // Collisions between keywords will allow movement, but not extend the
    // time until they go back to their original positions
    if (!withCircle) { return; }

    const keyword = (pair.bodyA === this.circle.body ? pair.bodyB : pair.bodyA).render.wrapper;

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

  onGuideMouseDown = () => {
    this.guideClickDetection = { ...this.circle.body.position };
  };

  closeGuide = () => {
    if (!this.circle.isExpanded || !this.guideClickDetection) { return; }
    this.guideClickDetection = undefined;
    this.props.setGuideExpanded(false);
    this.circle.close().finally(() => {
      console.log(this.circle.body)
      this.props.setGuidePosition(this.circle.body.position.x, this.circle.body.position.y);
      this.keywords.forEach((body) => {
        body.addCollisionMask(circleCategory);
      });
    });
  };

  onGuideMouseUp = (e) => {
    // If the click detection failed, don't do anything
    if (!this.guideClickDetection) { return; }
    this.props.setGuidePosition(this.circle.body.position.x, this.circle.body.position.y);
    const distance = {
      x: Math.abs(this.circle.body.position.x - this.guideClickDetection.x),
      y: Math.abs(this.circle.body.position.y - this.guideClickDetection.y),
    };
    if (distance.x > 5 || distance.y > 5) { return; }

    e.stopPropagation();
    if (!this.circle.isExpanded) {
      this.circle.open(this.getCenterCoordinates())
        .finally(() => {
          this.props.setGuideExpanded(true);
          this.props.setGuidePosition(this.circle.body.position.x, this.circle.body.position.y);
        });
      this.keywords.forEach((body) => {
        body.removeCollisionMask(circleCategory);
      });
    } else {
      this.closeGuide();
    }
  };

  render() {
    if (!this.circle) { return <g ref={this.groupRef} />; }
    const sortedKeywords = this.keywords
      .sort((a, b) => {
        if (a.isVisible && !b.isVisible) { return 1; }
        if (b.isVisible && !a.isVisible) { return -1; }
        return 0;
      });
    return (
      <g ref={this.groupRef} onClick={this.closeGuide}>
        {/* This is to ensure the group is always clickable */}
        <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
        {sortedKeywords.map(instance => (
          <g
            key={instance.body.id}
            className={classNames(
              'keyword',
              instance.keyword.className,
              { textVisible: instance.isVisible },
            )}
          >
            <text
              x={instance.body.position.x + instance.textOffset.x}
              y={instance.body.position.y + instance.textOffset.y}
              transform={`rotate(
                ${instance.body.angle * 180 / Math.PI}
                ${instance.body.position.x}
                ${instance.body.position.y}
              )`}
            >
              {instance.keyword.value}
            </text>
            <path d={instance.renderedPathPoints} />
          </g>
        ))}
        <path
          className="guideOutline"
          d={this.circle.outline.renderedPathPoints}
        />
        <path
          className="guide"
          d={this.circle.renderedPathPoints}
          onMouseDown={this.onGuideMouseDown}
          onTouchStart={this.onGuideMouseDown}
          onMouseUp={this.onGuideMouseUp}
          onTouchEnd={this.onGuideMouseUp}
        />;
      </g>
    );
  }
}
