import Matter from 'matter-js';
import Body from './Body';
import { circleCategory } from './categories';

export default class Guide extends Body {
  constructor(engine) {
    const body = Matter.Bodies.polygon(200, 200, 100, 50, {
      collisionFilter: { category: circleCategory },
    });
    body.frictionAir = 0.2;
    super(body, engine);

    this.locationBeforeExpand = { x: 0, y: 0 };
  }

  get isExpanded() { return this.scale !== 1; }

  open(dimensions) {
    this.locationBeforeExpand = { ...this.body.position };
    this.moveTo(dimensions.x, dimensions.y, 2500);
    this.scaleTo(Math.min(dimensions.x, dimensions.y) / 50, 2500);
  }

  close() {
    const { x, y } = this.locationBeforeExpand;
    return Promise.all([
      this.moveTo(x, y, 2500),
      this.scaleTo(1, 2500),
    ]);
  }
}
