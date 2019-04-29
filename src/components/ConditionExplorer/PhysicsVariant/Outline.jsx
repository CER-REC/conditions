import Matter from 'matter-js';
import Body from './Body';
import { guideOutlineCategory } from './categories';

export default class Outline extends Body {
  constructor(engine) {
    const body = Matter.Bodies.polygon(-200, 200, 100, 60, {
      collisionFilter: {
        category: guideOutlineCategory,
      },
    });
    body.frictionAir = 0.2;
    super(body, engine);
  }
}
