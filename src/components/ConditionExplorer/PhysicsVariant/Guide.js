import Matter from 'matter-js';
import Body from './Body';
import Outline from './Outline';
import { guideCategory, guideOutlineCategory } from './categories';

export default class Guide extends Body {
  constructor(engine) {
    // the number are wierd to deal with the increased radius compared to the
    const body = Matter.Bodies.polygon(203, 199.5, 100, 50, {
      collisionFilter: {
        category: guideCategory,
        mask: ~guideOutlineCategory,
        group: ~guideCategory,
      },
    });
    body.frictionAir = 0.2;
    super(body, engine);

    this.locationBeforeExpand = { x: 0, y: 0 };
    this.outline = new Outline(engine);
    this.outline.moveTo(200, 200, 3200)
      .then(() => {
        this.constraint = Matter.Constraint.create({
          bodyA: this.body,
          bodyB: this.outline.body,
          length: 0,
          stiffness: 0.7,
        });
        Matter.World.add(this.engine.world, this.constraint);
      });
  }

  get isExpanded() { return this.scale !== 1; }

  onUpdate(update) {
    super.onUpdate(update);
    this.outline.onUpdate(update);
  }

  open(dimensions) {
    this.locationBeforeExpand = { ...this.body.position };
    return Promise.all([
      this.moveTo(dimensions.x, dimensions.y, 2500),
      this.scaleTo(Math.min(dimensions.x, dimensions.y) / 50, 2500),
    ]);
  }

  close() {
    const { x, y } = this.locationBeforeExpand;
    return Promise.all([
      this.moveTo(x, y, 2500),
      this.scaleTo(1, 2500),
    ]);
  }

  scaleTo(s, time) {
    super.scaleTo(s, time);
    this.outline.scaleTo(1, 1);
  }
}
