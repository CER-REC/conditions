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
      this.targetPosition.promise.reject(new Error('Movement cancelled due to new target'));
    }
    if (time === 0 || (this.body.position.x === x && this.body.position.y === y)) {
      Matter.Body.setPosition(this.body, { x, y });
      Matter.Body.setVelocity(this.body, { x: 0, y: 0 });
      return Promise.resolve();
    }
    const timestamp = Date.now();
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

  rotateTo(rRaw, time = 0) {
    const modRad = v => v % (Math.PI * 2);
    const r = modRad(rRaw);
    if (this.targetRotation) {
      this.targetRotation.promise.reject(new Error('Rotation cancelled due to new target'));
    }
    let start = modRad(this.body.angle + (Math.PI * 2));
    if (time === 0 || r === start) {
      Matter.Body.setAngle(this.body, r);
      Matter.Body.setAngularVelocity(this.body, 0);
      return Promise.resolve();
    }
    const timestamp = Date.now();
    if (start > Math.PI) { start -= (Math.PI * 2); }
    this.targetRotation = {
      start: { r: start, timestamp },
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
      this.targetScale.promise.reject(new Error('Scale cancelled due to new target'));
    }
    if (time === 0 || s === this.scale) {
      const scale = (1 / this.scale) * s;
      Matter.Body.scale(this.body, scale, scale);
      this.scale = s;
      return Promise.resolve();
    }
    const timestamp = Date.now();
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

  onUpdatePosition(inOut, start, end) {
    Matter.Body.setPosition(this.body, {
      x: start.x + ((end.x - start.x) * inOut),
      y: start.y + ((end.y - start.y) * inOut),
    });
  }

  onUpdateRotation(inOut, start, end) {
    Matter.Body.setAngle(this.body, start.r + ((end.r - start.r) * inOut));
  }

  onUpdateScale(inOut, start, end) {
    const scale = start.s + (inOut * (end.s - start.s));
    Matter.Body.scale(this.body, (1 / this.scale) * scale, (1 / this.scale) * scale);
    this.scale = scale;
  }

  onUpdateParameter(update, param) {
    const targetParam = `target${param}`;
    if (!this[targetParam]) { return; }

    // If there is a target, update our position along the easing curve
    const { start, end } = this[targetParam];
    const progress = (Date.now() - start.timestamp) / (end.timestamp - start.timestamp);
    const inOut = easeInOutCubic(Math.min(1, progress));

    this[`onUpdate${param}`](inOut, start, end);

    if (inOut === 1) {
      // Stop the movement to prevent drifting
      switch (param) {
        case 'Position': Matter.Body.setVelocity(this.body, { x: 0, y: 0 }); break;
        case 'Rotation': Matter.Body.setAngularVelocity(this.body, 0); break;
        default: break;
      }

      this[targetParam].promise.resolve();
      clearInterval(this[targetParam].promise.timeout);
      this[targetParam] = false;
    }
  }

  onUpdate(update) {
    const { body } = this;

    this.onUpdateParameter(update, 'Position');
    this.onUpdateParameter(update, 'Rotation');
    this.onUpdateParameter(update, 'Scale');

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
