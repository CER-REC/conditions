import Body from './Body';
import {
  circleCategory,
  placeholderCategory,
  resettingCategory,
  visibleTextCategory,
} from './categories';

export default class Keyword extends Body {
  get isVisible() { return this.body.collisionFilter.category !== placeholderCategory; }

  onUpdate(update) {
    super.onUpdate(update);

    if (this.category === resettingCategory && !this.isMoving) {
      this.category = placeholderCategory;
    }
  }
}
