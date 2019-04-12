import Matter from 'matter-js';
import Body from './Body';
import {
  guideOutlineCategory,
  placeholderCategory,
  resettingCategory,
  visibleTextCategory,
} from './categories';

export default class Keyword extends Body {
  constructor(keyword, engine) {
    const { outline } = keyword;
    const body = Matter.Bodies.rectangle(
      keyword.outline.x + (keyword.outline.width / 2),
      keyword.outline.y + (keyword.outline.height / 2),
      outline.width,
      outline.height,
      {
        collisionFilter: {
          category: placeholderCategory,
          mask: guideOutlineCategory,
        },
      },
    );
    body.frictionAir = 0.05;
    super(body, engine);
    this.keyword = keyword;
  }

  get isVisible() { return this.body.collisionFilter.category !== placeholderCategory; }

  get textOffset() {
    return {
      x: this.keyword.textOffset.x,
      y: this.keyword.textOffset.y - (this.keyword.outline.height / 2),
    };
  }

  resetPosition() {
    this.removeCollisionMask(guideOutlineCategory);
    return Promise.all([
      this.moveTo(
        this.keyword.outline.x + (this.keyword.outline.width / 2),
        this.keyword.outline.y + (this.keyword.outline.height / 2),
        2500,
      ),
      this.rotateTo(0, 2500),
      this.scaleTo(1, 2500),
    ]).finally(() => {
      this.addCollisionMask(guideOutlineCategory);
    });
  }

  onUpdate(update, keywordsCanReset, circleBounds) {
    super.onUpdate(update);

    if (this.category === resettingCategory && !this.isMoving) {
      this.category = placeholderCategory;
    }

    if (this.category === visibleTextCategory
        && this.body.render.lastCollision + 5000 <= update.source.timing.timestamp
        && keywordsCanReset) {
      const { x, y, width, height } = this.keyword.outline;
      const originalBounds = {
        min: { x, y },
        max: { x: x + width, y: y + height },
      };
      if (Matter.Bounds.overlaps(originalBounds, circleBounds) === false) {
        this.category = resettingCategory;
        this.removeCollisionMask(visibleTextCategory);
        this.resetPosition();
      }
    }
  }
}
