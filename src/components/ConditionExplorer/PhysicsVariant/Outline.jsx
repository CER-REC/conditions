import Matter from 'matter-js';
import Body from './Body';
import { guideCategory, guideOutlineCategory } from './categories';

export default class Outline extends Body {
  constructor(engine) {
    const body = Matter.Bodies.polygon(-200, 200, 100, 60, {
      collisionFilter: {
        category: guideOutlineCategory,
        mask: ~guideCategory,
        group: ~guideCategory,
      },
      mass: 130,
    });
    body.frictionAir = 0.2;
    super(body, engine);
  }
}
