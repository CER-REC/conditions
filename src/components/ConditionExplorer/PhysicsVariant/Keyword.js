import Matter from 'matter-js';
import Body from './Body';
import {
  circleCategory,
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
          mask: circleCategory,
        },
      },
    );
    body.frictionAir = 0.05;
    body.render.className = keyword.className;
    body.render.value = keyword.value;
    body.render.originalData = keyword;
    body.render.textOffset = {
      x: keyword.textOffset.x,
      y: keyword.textOffset.y - (keyword.outline.height / 2),
    };

    super(body, engine);
    this.keyword = keyword;
  }

  get isVisible() { return this.body.collisionFilter.category !== placeholderCategory; }

  resetPosition() {
    return Promise.all([
      this.moveTo(
        this.keyword.outline.x + (this.keyword.outline.width / 2),
        this.keyword.outline.y + (this.keyword.outline.height / 2),
        2500,
      ),
      this.rotateTo(0, 2500),
    ]);
  }

  onUpdate(update, keywordsCanReset, circleBounds) {
    super.onUpdate(update);

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

    if (this.category === resettingCategory && !this.isMoving) {
      this.category = placeholderCategory;
    }
  }
}
