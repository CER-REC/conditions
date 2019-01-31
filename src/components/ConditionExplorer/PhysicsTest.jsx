import React from 'react';
import Matter, { Bodies, Composite, Engine, Events, Mouse, MouseConstraint, World } from 'matter-js';
import handleDrag from '../../utilities/handleDrag';
import './styles.scss';

const circleCategory = 0x0002;

export default class PhysicsTest extends React.Component {
  constructor(props) {
    super(props);

    this.groupRef = React.createRef();

    const world = Matter.World.create({ gravity: { x: 0, y: 0 } });
    this.engine = Engine.create({ world });
    this.lastTime = null;
    this.loopID = null;

    // Set up bodies
    this.circle = Bodies.circle(250, 400, 50, {
      collisionFilter: { category: circleCategory },
    });
    this.keywords = [
      Bodies.rectangle(200, 250, 100, 10),
      Bodies.rectangle(400, 250, 100, 10),
    ];

    this.keywords.forEach(v => {
      v.frictionAir = 0.05;
    });

    World.add(this.engine.world, this.circle);
    World.add(this.engine.world, this.keywords);
    Engine.run(this.engine);
  }

  componentDidMount() {
    const mouse = Mouse.create(this.groupRef.current.parentElement);
    const mouseConstraint = MouseConstraint.create(this.engine, {
      mouse,
      collisionFilter: { mask: circleCategory },
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });
    this.mouse = mouse;

    World.add(this.engine.world, mouseConstraint);

    let runner = Matter.Runner.create();
    Matter.Runner.run(runner, this.engine);

    Events.on(this.engine, 'afterUpdate', this.onUpdate);
    Events.on(this.engine, 'collisionStart', this.onCollision);
    this.loop();
  }

  componentWillUnmount() {
    Events.off(this.engine, 'afterUpdate', this.onUpdate);
    Events.off(this.engine, 'collisionStart', this.onCollision);
    window.cancelAnimationFrame(this.loopID);
  }

  onUpdate = (event) => {
    // Check if any positions have updated
    const bodiesMoved = Composite.allBodies(this.engine.world).find((body) => {
      if (Math.abs(body.position.x - body.positionPrev.x) > 0.01) { return true; }
      if (Math.abs(body.position.y - body.positionPrev.y) > 0.01) { return true; }
      return false;
    });
    if (bodiesMoved) { this.setState({}); }
  };

  onCollision = (...vals) => {
    // console.log('onCollision', vals);
  };

  loop = () => {
    const currTime = 0.001 * Date.now();
    Engine.update(
      this.engine,
      1000 / 60,
      this.lastTime ? currTime / this.lastTime : 1,
    );
    this.lastTime = currTime;
    this.loopID = window.requestAnimationFrame(this.loop);
  }

  render() {
    const bodies = Composite.allBodies(this.engine.world).map((body) => {
      // console.log(body);
      const d = body.vertices.map((v, i) => `${i === 0 ? 'M' : 'L'} ${v.x} ${v.y}`).join(' ');
      return <path key={body.id} d={d} stroke="#000" />
    });
    return (
      <g ref={this.groupRef}>
        {bodies}
      </g>
    );
  }
}
