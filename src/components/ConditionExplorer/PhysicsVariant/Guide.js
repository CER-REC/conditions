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
  }
}
