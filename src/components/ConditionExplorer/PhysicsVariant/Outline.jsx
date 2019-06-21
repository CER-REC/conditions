import Matter from 'matter-js';
import Body from './Body';
import { guideOutlineCategory } from './categories';

import { guideSize } from '../../../constants';

export default class Outline extends Body {
  constructor(engine) {
    const body = Matter.Bodies.polygon(-200, 200, 100, (guideSize / 2) + 10, {
      collisionFilter: {
        category: guideOutlineCategory,
      },
    });
    body.frictionAir = 0.2;
    super(body, engine);
  }

  // Needs to have a velocity so that it will collide properly with keywords
  onUpdatePosition(inOut, start, end) {
    const prevPosition = { ...this.body.position };

    super.onUpdatePosition(inOut, start, end);

    Matter.Body.setVelocity(this.body, {
      x: (this.body.position.x - prevPosition.x),
      y: (this.body.position.y - prevPosition.y),
    });
  }
}
