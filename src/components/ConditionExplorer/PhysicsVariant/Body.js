import Matter from 'matter-js';

// Found at https://gist.github.com/gre/1650294
const easeOutCubic = t => ((--t) * t * t) + 1; // eslint-disable-line no-plusplus
const easeInOutCubic = t => (t < 0.5 ? (4 * t * t * t) : ((t - 1) * (2 * t - 2) * (2 * t - 2) + 1));

const calculateProgress = (start, end, current) => {
  const distanceTotal = end - start;
  if (distanceTotal === 0) { return 1; }
  const distanceCurrent = current - start;
  return distanceCurrent / distanceTotal;
};

export default class Body {
  constructor(body) {
    this.body = body;
    // TODO: Need to clean this up when we're done because this will cause a memory leak
    body.render.wrapper = this; // eslint-disable-line no-param-reassign

    this.targetPosition = false;
    this.targetRotation = false;
  }

  get isMoving() { return !!(this.body.speed || this.body.angularSpeed); }

  get category() { return this.body.collisionFilter.category; }

  set category(category) { this.body.collisionFilter.category = category; }

  /* eslint-disable no-bitwise */
  addCollisionMask(mask) { this.body.collisionFilter.mask |= mask; }

  removeCollisionMask(mask) { this.body.collisionFilter.mask &= ~mask; }
  /* eslint-enable no-bitwise */

  moveTo(x, y, speed = 1, accuracy = 1) {
    this.targetPosition = {
      start: { ...this.body.position },
      end: { x, y },
      speed,
      accuracy,
    };
  }

  rotateTo(r, speed = 1, accuracy = 1) {
    this.targetRotation = {
      start: this.body.angle,
      end: r,
      speed,
      accuracy,
    };
  }

  onUpdate(/* update */) {
    const { body } = this;

    // If there is a target position, update our velocity
		if (this.targetPosition) {
      const { start, end } = this.targetPosition;
      const current = body.position;
      const progress = {
        x: calculateProgress(start.x, end.x, current.x),
        // y: calculateProgress(start.y, end.y, current.y),
      };
      const inOut = {
        x: Math.min(1, Math.max(0.001, easeInOutCubic(progress.x) * Math.sign(end.x - start.x))),
        // y: Math.min(1, Math.max(0.001, easeInOutCubic(progress.y) * Math.sign(end.y - start.y))),
      };
      const distanceMoved = current.x - start.x;
      const velocity = {
        //x: (inOut.x) * (end.x - start.x),
        x: (inOut.x * distanceMoved) - distanceMoved,
        // x: (1 - inOut.x) * (end.x - start.x),
        // y: (inOut.y) * (end.y - start.y),
        y: 0,
      };
      console.log({ start: start.x, end: end.x, current: current.x, progress: progress.x, inOut: inOut.x, velocity: velocity.x });
      Matter.Body.setVelocity(body, velocity);
      //Matter.Body.setVelocity(body, {x: 0.1, y: 0});
    }

    // If the body isn't moving very much, stop it completely.
    /*
    if (body.velocity.x || body.velocity.y) {
      const newVelocity = { ...body.velocity };
      if (Math.abs(body.position.x - body.positionPrev.x) < 0.01) { newVelocity.x = 0; }
      if (Math.abs(body.position.y - body.positionPrev.y) < 0.01) { newVelocity.y = 0; }
      if (newVelocity.x !== body.velocity.x || newVelocity.y !== body.velocity.y) {
        Matter.Body.setVelocity(body, newVelocity);
      }
    }
    */

    // If the body isn't rotating very much, stop it completely.
    if (body.angularVelocity
        && (Math.abs(body.angle - body.anglePrev) * 180) / Math.PI > 0.01) {
      Matter.Body.setAngularVelocity(0);
    }

    // If the body has stopped moving, remove its target position so that it
    // doesn't automatically move back if bumped.
    if (!this.isMoving) { body.targetPosition = false; }
  }
}
