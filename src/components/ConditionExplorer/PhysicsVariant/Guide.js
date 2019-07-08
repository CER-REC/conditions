import Matter from 'matter-js';
import Body from './Body';
import Outline from './Outline';
import { guideCategory, guideOutlineCategory } from './categories';

import { guideSize } from '../../../constants';

export default class Guide extends Body {
  constructor(engine) {
    const body = Matter.Bodies.polygon(700, 300, 100, (guideSize / 2), {
      collisionFilter: {
        category: guideCategory,
        mask: ~guideOutlineCategory, // eslint-disable-line no-bitwise
      },
    });
    super(body, engine);

    this.locationBeforeExpand = { x: 0, y: 0 };
    this.outline = new Outline(engine);
    this.outlineReady = false;
    this.outline.moveTo(this.body.position.x, this.body.position.y, 2500)
      .finally(() => { this.outlineReady = true; });
  }

  get isExpanded() { return this.scale !== 1; }

  onUpdate(update) {
    super.onUpdate(update);
    this.outline.onUpdate(update);
    if (this.outlineReady) {
      Matter.Body.setPosition(this.body, this.outline.body.position);
    }
  }

  open(dimensions) {
    this.locationBeforeExpand = { ...this.body.position };
    return Promise.all([
      this.moveTo(dimensions.x, dimensions.y, 2500),
      this.scaleTo(Math.min(dimensions.x, dimensions.y) / 65, 2500),
    ]);
  }

  close() {
    const { x, y } = this.locationBeforeExpand;
    const closeTime = Date.now() - this.targetScale.start.timestamp;
    return Promise.all([
      this.moveTo(x, y, closeTime),
      this.scaleTo(1, closeTime),
    ]);
  }

  moveTo(x, y, time) {
    return this.outline.moveTo(x, y, time);
  }
}
