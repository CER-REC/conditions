import Matter from 'matter-js';

// Found at https://gist.github.com/gre/1650294
const easeInOutCubic = t => (t < 0.5 ? (4 * t * t * t) : ((t - 1) * (2 * t - 2) * (2 * t - 2) + 1));

export default class Body {
  constructor(body, engine) {
    this.body = body;
    this.engine = engine;

    // TODO: Need to clean this up when we're done because this will cause a memory leak
    body.render.wrapper = this; // eslint-disable-line no-param-reassign

    this.scale = 1;

    this.targetPosition = false;
    this.targetRotation = false;
    this.targetScale = false;
  }

  get isMoving() { return !!(this.body.speed || this.body.angularSpeed); }

  get category() { return this.body.collisionFilter.category; }

  set category(category) { this.body.collisionFilter.category = category; }

  /* eslint-disable no-bitwise */
  addCollisionMask(mask) { this.body.collisionFilter.mask |= mask; }

  removeCollisionMask(mask) { this.body.collisionFilter.mask &= ~mask; }
  /* eslint-enable no-bitwise */

  moveTo(x, y, time = 0) {
    if (time === 0) {
      Matter.Body.setPosition(this.body, { x, y });
      return;
    }
    const { timestamp } = this.engine.timing;
    this.targetPosition = {
      start: { ...this.body.position, timestamp },
      end: { x, y, timestamp: timestamp + time },
      lastProgress: 0,
    };
  }

  rotateTo(r, time = 0) {
    if (time === 0) {
      Matter.Body.setAngle(this.body, r);
      return;
    }
    const { timestamp } = this.engine.timing;
    this.targetRotation = {
      start: { r: this.body.angle, timestamp },
      end: { r, timestamp: timestamp + time },
      lastProgress: 0,
    };
  }

  scaleTo(s, time = 0) {
    if (time === 0) {
      const scale = (1 / this.scale) * s;
      Matter.Body.scale(this.body, scale, scale);
      this.scale = s;
      return;
    }
    const { timestamp } = this.engine.timing;
    this.targetScale = {
      start: { s: this.scale, timestamp },
      end: { s, timestamp: timestamp + time },
    };
  }

  onUpdatePosition(update) {
    if (!this.targetPosition) { return; }
    // If there is a target position, update our velocity
    const { start, end } = this.targetPosition;
    const progress = Math.min(1,
      (update.timestamp - start.timestamp) / (end.timestamp - start.timestamp));
    const inOut = easeInOutCubic(progress) - easeInOutCubic(this.targetPosition.lastProgress);
    if (inOut === 0) {
      // TODO: This doesn't bring it quite far enough
      Matter.Body.setPosition(this.body, { x: end.x, y: end.y });
      this.targetPosition = false;
      return;
    }
    this.targetPosition.lastProgress = progress;
    const velocity = {
      x: inOut * (end.x - start.x) * (1 + this.body.frictionAir),
      y: inOut * (end.y - start.y) * (1 + this.body.frictionAir),
    };
    Matter.Body.setVelocity(this.body, velocity);
  }

  onUpdateRotation(update) {
    if (!this.targetRotation) { return; }
    // If there is a target rotation, update our velocity
    const { start, end } = this.targetRotation;
    const progress = Math.min(1,
      (update.timestamp - start.timestamp) / (end.timestamp - start.timestamp));
    const inOut = easeInOutCubic(progress) - easeInOutCubic(this.targetRotation.lastProgress);
    if (inOut === 0) {
      // TODO: This doesn't bring it quite far enough
      Matter.Body.setAngle(this.body, end.r);
      this.targetRotation = false;
      return;
    }
    this.targetRotation.lastProgress = progress;
    const velocity = inOut * (end.r - start.r) * (1 + this.body.frictionAir);
    Matter.Body.setAngularVelocity(this.body, velocity);
  }

  onUpdateScale(update) {
    if (!this.targetScale) { return; }
    // If there is a target rotation, update our velocity
    const { start, end } = this.targetScale;
    const progress = Math.min(1,
      (update.timestamp - start.timestamp) / (end.timestamp - start.timestamp));
    const inOut = easeInOutCubic(progress);
    if (inOut === 1) {
      Matter.Body.scale(this.body, (1 / this.scale) * end.s, (1 / this.scale) * end.s);
      this.scale = end.s;
      this.targetScale = false;
      return;
    }
    const scale = start.s + (inOut * (end.s - start.s));
    Matter.Body.scale(this.body, (1 / this.scale) * scale, (1 / this.scale) * scale);
    this.scale = scale;
  }

  onUpdate(update) {
    const { body } = this;

    this.onUpdatePosition(update);
    this.onUpdateRotation(update);
    this.onUpdateScale(update);

    // If the body isn't moving very much, stop it completely.
    if (body.velocity.x || body.velocity.y) {
      const newVelocity = { ...body.velocity };
      if (Math.abs(body.position.x - body.positionPrev.x) < 0.01) { newVelocity.x = 0; }
      if (Math.abs(body.position.y - body.positionPrev.y) < 0.01) { newVelocity.y = 0; }
      if (newVelocity.x !== body.velocity.x || newVelocity.y !== body.velocity.y) {
        Matter.Body.setVelocity(body, newVelocity);
      }
    }

    // If the body isn't rotating very much, stop it completely.
    if (body.angularVelocity
        && (Math.abs(body.angle - body.anglePrev) * 180) / Math.PI < 0.01) {
      Matter.Body.setAngularVelocity(body, 0);
    }

    // If the body has stopped moving, remove its target position so that it
    // doesn't automatically move back if bumped.
    if (!this.isMoving) { body.targetPosition = false; }
  }
}
