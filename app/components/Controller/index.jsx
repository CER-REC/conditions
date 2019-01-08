import React from 'react';
import PropTypes from 'prop-types';

const line = y2 => (<line strokeDasharray="5 5 5" x1="10" x2="10" y1="10" y2={y2} stroke="rgb(209, 5, 122)" strokeWidth="1" />);
const arrow = () => (<path d="M 5 5 L 15 5 L 10 15 z" fill="rgb(209, 5, 122)" />);

const Controller = props => (
  <div className="Controller">
    <svg height={props.yend + props.ystart} width="20" transform={`translate(${props.x}, ${props.ystart})`}>
      {arrow()}
      {line(props.yend)}
    </svg>
  </div>
);

Controller.propTypes = {
  x: PropTypes.number.isRequired,
  yend: PropTypes.number.isRequired,
  ystart: PropTypes.number.isRequired,
};

export default Controller;
