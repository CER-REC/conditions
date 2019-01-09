import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Controller = props => (
  <div className="Controller">
    <svg height={(props.yend + props.ystart) + (props.radius * 2)} width={(props.radius) * 2} transform={`translate(${props.x}, ${props.ystart})`}>
      <text x={props.radius} y="9" textAnchor="middle">{props.text}</text>
      <path className="arrow" d="M 5 5 L 15 5 L 10 15 z" transform={`translate(${props.radius - 10}, 5)`} />
      <line className="line" x1={props.radius} x2={props.radius} y1="15" y2={props.yend} />
      <circle className="selectedCircle" cx={props.radius} cy={props.yend + props.radius} r={props.radius} />
    </svg>
  </div>
);

Controller.propTypes = {
  x: PropTypes.number.isRequired,
  yend: PropTypes.number.isRequired,
  ystart: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default Controller;
