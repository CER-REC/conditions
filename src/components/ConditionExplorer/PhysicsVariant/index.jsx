/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
import React from 'react';
import classNames from 'classnames';
import Matter from 'matter-js';
import { keywordList } from '../proptypes';
import {
  circleCategory,
  resettingCategory,
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
    this.lastDeltaTime = 0;
    this.locationBeforeExpand = { x: 0, y: 0 };
    this.keywordsCanReset = true;
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
      .onUpdate(update, this.keywordsCanReset, this.circle.body.bounds));
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

  openGuide = (e) => {
    const circle = this.circle.body;
    if (circle.speed || circle.render.expanded) { return; }
    e.stopPropagation();
    this.locationBeforeExpand = { x: circle.position.x, y: circle.position.y };
    const dimensions = this.getCenterCoordinates();
    this.circle.moveTo(dimensions.x, dimensions.y, 2500);
    this.circle.scaleTo(Math.min(dimensions.x, dimensions.y) / 50, 2500);
    circle.render.expanded = true;
    this.keywordsCanReset = false;
    this.keywords.forEach((body) => {
      body.removeCollisionMask(circleCategory);
    });
  }

  closeGuide = () => {
    const { x, y } = this.locationBeforeExpand;
    Promise
      .all([
        this.circle.moveTo(x, y, 2500),
        this.circle.scaleTo(1, 2500),
      ])
      .finally(() => {
        this.circle.body.render.expanded = false;
        this.keywordsCanReset = true;
        this.keywords.forEach((body) => {
          body.addCollisionMask(circleCategory);
        });
      });
  }

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
        {sortedKeywords.map(keyword => (
          <g
            key={keyword.body.id}
            className={classNames(
              'keyword',
              keyword.body.render.className,
              { textVisible: keyword.isVisible },
            )}
          >
            <text
              x={keyword.body.position.x + keyword.body.render.textOffset.x}
              y={keyword.body.position.y + keyword.body.render.textOffset.y}
              transform={`rotate(
                ${keyword.body.angle * 180 / Math.PI}
                ${keyword.body.position.x}
                ${keyword.body.position.y}
              )`}
            >
              {keyword.body.render.value}
            </text>
            <path d={keyword.renderedPathPoints} />
          </g>
        ))}
        <path
          className="guide"
          d={this.circle.renderedPathPoints}
          onClick={this.openGuide}
        />;
      </g>
    );
  }
}
