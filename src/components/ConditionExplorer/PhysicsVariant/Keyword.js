import Matter from 'matter-js';
import Body from './Body';
import {
  guideCategory,
  guideOutlineCategory,
  placeholderCategory,
  resettingCategory,
  visibleTextCategory,
} from './categories';

export default class Keyword extends Body {
  constructor(keyword, engine, isSelectedKeyword) {
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
        density: 0.08,
        frictionAir: 0.06,
      },
    );
    super(body, engine);
    this.keyword = keyword;
    this.lastCollision = Date.now();
    this.isSelectedKeyword = isSelectedKeyword;
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
    this.removeCollisionMask(guideCategory);
    return Promise.all([
      this.moveTo(
        this.keyword.outline.x + (this.keyword.outline.width / 2),
        this.keyword.outline.y + (this.keyword.outline.height / 2),
        1000,
      ),
      this.rotateTo(0, 1000),
      this.scaleTo(1, 1000),
    ]).finally(() => {
      this.addCollisionMask(guideOutlineCategory);
    });
  }

  onUpdate(update, keywordsCanReset, circleBounds) {
    const threshold = 1.01;
    const magnitude = Matter.Vector.magnitude(this.body.velocity);
    if (magnitude > threshold) {
      const clamped = Matter.Vector.mult(
        Matter.Vector.normalise(this.body.velocity),
        threshold,
      );

      Matter.Body.setVelocity(this.body, clamped);
    }

    super.onUpdate(update);

    if (this.category === resettingCategory && !this.isMoving) {
      this.category = placeholderCategory;
    }

    if (this.category === visibleTextCategory
        && this.lastCollision + 5000 <= Date.now()
        && !this.isSelectedKeyword(this.body.id)
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
