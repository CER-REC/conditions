/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Matter from 'matter-js';
import { keywordList } from '../proptypes';
import {
  guideOutlineCategory,
  resettingCategory,
  visibleTextCategory,
} from './categories';
import Keyword from './Keyword';
import Guide from './Guide';

export default class PhysicsVariant extends React.PureComponent {
  static propTypes = {
    keywords: keywordList.isRequired,
    setGuidePosition: PropTypes.func.isRequired,
    setGuideExpanded: PropTypes.func.isRequired,
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

    this.guide = new Guide(this.engine);
    this.keywords = this.props.keywords
      .map(keyword => new Keyword(keyword, this.engine));

    const mouseConstraint = Matter.MouseConstraint.create(this.engine, {
      mouse: Matter.Mouse.create(this.groupRef.current.parentElement),
      constraint: { render: { visible: false } },
      collisionFilter: { mask: guideOutlineCategory },
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
    this.guide.onUpdate(update);
    this.keywords.forEach(keyword => keyword
      .onUpdate(update, !this.guide.isExpanded, this.guide.outline.body.bounds));
  };

  onCollision = collision => collision.pairs.forEach((pair) => {
    const guideOutline = this.guide.outline.body;
    const withCircle = pair.bodyA === guideOutline || pair.bodyB === guideOutline;
    pair.bodyA.render.lastCollision = collision.source.timing.timestamp;
    pair.bodyB.render.lastCollision = collision.source.timing.timestamp;
    // Collisions between keywords will allow movement, but not extend the
    // time until they go back to their original positions
    if (!withCircle) { return; }

    const keyword = (pair.bodyA === guideOutline ? pair.bodyB : pair.bodyA).render.wrapper;

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
      deltaTime,
      this.lastDeltaTime ? (deltaTime / this.lastDeltaTime) : 1,
    );
    this.lastTime = currTime;
    this.lastDeltaTime = deltaTime;
    this.loopID = window.requestAnimationFrame(this.loop);
    this.setState(state => ({ renderToggle: !state.renderToggle }));
  }

  updateGuidePosition = () => this.props.setGuidePosition(
    this.guide.body.position.x,
    this.guide.body.position.y,
    Math.abs(this.guide.body.bounds.max.x - this.guide.body.bounds.min.x) / 2,
  );

  onGuideMouseDown = () => {
    this.guideClickDetection = { ...this.guide.body.position };
  };

  closeGuide = () => {
    if (!this.guide.isExpanded || !this.guideClickDetection) { return; }
    this.guideClickDetection = undefined;
    this.props.setGuideExpanded(false);
    this.guide.close().finally(() => {
      this.updateGuidePosition();
      this.keywords.forEach((body) => {
        if (body.category === resettingCategory) { return; }
        body.addCollisionMask(guideOutlineCategory);
      });
    });
  };

  onGuideMouseUp = (e) => {
    // If the click detection failed, don't do anything
    if (!this.guideClickDetection) { return; }
    this.updateGuidePosition();
    const distance = {
      x: Math.abs(this.guide.body.position.x - this.guideClickDetection.x),
      y: Math.abs(this.guide.body.position.y - this.guideClickDetection.y),
    };
    if (distance.x > 5 || distance.y > 5) { return; }

    e.stopPropagation();
    if (!this.guide.isExpanded) {
      this.guide.open(this.getCenterCoordinates())
        .then(() => { this.props.setGuideExpanded(true); })
        .finally(() => { this.updateGuidePosition(); });
      this.keywords.forEach((body) => {
        body.removeCollisionMask(guideOutlineCategory);
      });
    } else {
      this.closeGuide();
    }
  };

  render() {
    if (!this.guide) { return <g ref={this.groupRef} />; }
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
          d={this.guide.outline.renderedPathPoints}
        />
        <path
          className="guide"
          d={this.guide.renderedPathPoints}
          onMouseDown={this.onGuideMouseDown}
          onTouchStart={this.onGuideMouseDown}
          onMouseUp={this.onGuideMouseUp}
          onTouchEnd={this.onGuideMouseUp}
        />;
      </g>
    );
  }
}
