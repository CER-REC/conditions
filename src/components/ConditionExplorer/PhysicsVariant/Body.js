import Matter from 'matter-js';

// Found at https://gist.github.com/gre/1650294
const easeInOutCubic = t => (t < 0.5 ? (4 * t * t * t) : ((t - 1) * (2 * t - 2) * (2 * t - 2) + 1));

export default class Body {
  constructor(body, engine) {
    this.body = body;
    this.engine = engine;

    Matter.World.add(this.engine.world, this.body);

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

  get renderedPathPoints() {
    return this.body.vertices
      .concat(this.body.vertices[0]) // Add it onto the end so we create a full path
      .map((v, i) => `${i === 0 ? 'M' : 'L'} ${v.x} ${v.y}`)
      .join(' ');
  }

  /* eslint-disable no-bitwise */
  addCollisionMask(mask) { this.body.collisionFilter.mask |= mask; }

  removeCollisionMask(mask) { this.body.collisionFilter.mask &= ~mask; }
  /* eslint-enable no-bitwise */

  moveTo(x, y, time = 0) {
    if (this.targetPosition) {
      this.targetPosition.reject(new Error('Movement cancelled due to new target'));
    }
    if (time === 0) {
      Matter.Body.setPosition(this.body, { x, y });
      return Promise.resolve();
    }
    const { timestamp } = this.engine.timing;
    this.targetPosition = {
      start: { ...this.body.position, timestamp },
      end: { x, y, timestamp: timestamp + time },
    };
    return new Promise((resolve, reject) => {
      this.targetPosition.promise = {
        resolve,
        reject,
        // If we haven't resolved in 2x the time, reject the promise
        timeout: setTimeout(() => reject(new Error(`Movement did not finish within ${time * 2}ms limit`)), time * 2),
      };
    });
  }

  rotateTo(r, time = 0) {
    if (this.targetRotation) {
      this.targetRotation.reject(new Error('Rotation cancelled due to new target'));
    }
    if (time === 0) {
      Matter.Body.setAngle(this.body, r);
      return Promise.resolve();
    }
    const { timestamp } = this.engine.timing;
    this.targetRotation = {
      start: { r: this.body.angle, timestamp },
      end: { r, timestamp: timestamp + time },
    };
    return new Promise((resolve, reject) => {
      this.targetRotation.promise = {
        resolve,
        reject,
        // If we haven't resolved in 2x the time, reject the promise
        timeout: setTimeout(() => reject(new Error(`Rotation did not finish within ${time * 2}ms limit`)), time * 2),
      };
    });
  }

  scaleTo(s, time = 0) {
    if (this.targetScale) {
      this.targetScale.reject(new Error('Scale cancelled due to new target'));
    }
    if (time === 0) {
      const scale = (1 / this.scale) * s;
      Matter.Body.scale(this.body, scale, scale);
      this.scale = s;
      return Promise.resolve();
    }
    const { timestamp } = this.engine.timing;
    this.targetScale = {
      start: { s: this.scale, timestamp },
      end: { s, timestamp: timestamp + time },
    };
    return new Promise((resolve, reject) => {
      this.targetScale.promise = {
        resolve,
        reject,
        // If we haven't resolved in 2x the time, reject the promise
        timeout: setTimeout(() => reject(new Error(`Scale did not finish within ${time * 2}ms limit`)), time * 2),
      };
    });
  }

  onUpdatePosition(update) {
    if (!this.targetPosition) { return; }
    // If there is a target position, update our velocity
    const { start, end } = this.targetPosition;
    const progress = Math.min(1,
      (update.timestamp - start.timestamp) / (end.timestamp - start.timestamp));
    const inOut = easeInOutCubic(progress);
    Matter.Body.setPosition(this.body, {
      x: start.x + ((end.x - start.x) * inOut),
      y: start.y + ((end.y - start.y) * inOut),
    });
    if (inOut === 1) {
      this.targetPosition.promise.resolve();
      clearInterval(this.targetPosition.promise.timeout);
      this.targetPosition = false;
    }
  }

  onUpdateRotation(update) {
    if (!this.targetRotation) { return; }
    // If there is a target rotation, update our velocity
    const { start, end } = this.targetRotation;
    const progress = Math.min(1,
      (update.timestamp - start.timestamp) / (end.timestamp - start.timestamp));
    const inOut = easeInOutCubic(progress);
    Matter.Body.setAngle(this.body, start.r + ((end.r - start.r) * inOut));
    if (inOut === 1) {
      this.targetRotation.promise.resolve();
      clearInterval(this.targetRotation.promise.timeout);
      this.targetRotation = false;
    }
  }

  onUpdateScale(update) {
    if (!this.targetScale) { return; }
    // If there is a target rotation, update our velocity
    const { start, end } = this.targetScale;
    const progress = Math.min(1,
      (update.timestamp - start.timestamp) / (end.timestamp - start.timestamp));
    const inOut = easeInOutCubic(progress);
    const scale = start.s + (inOut * (end.s - start.s));
    Matter.Body.scale(this.body, (1 / this.scale) * scale, (1 / this.scale) * scale);
    this.scale = scale;
    if (inOut === 1) {
      this.targetScale.promise.resolve();
      clearInterval(this.targetScale.promise.timeout);
      this.targetScale = false;
    }
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
