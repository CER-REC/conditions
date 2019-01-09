import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Control = props => (
  <g transform={props.positionControl} className="Control">
    <text x="0" y="15" textAnchor="middle">{props.numOfConditionsLabel}</text>
    <line
      strokeDasharray="4.051 4.051"
      x1="0"
      x2="0"
      y1={props.yHeight}
      y2="220"
      stroke="rgb(209, 5, 122)"
      strokeWidth="1"
    />
    <path
      d="M 5 5 L 15 5 L 10 15 z"
      fill="rgb(209, 5, 122)"
      transform={`translate(-10, ${props.controlTopBaseline})`}
    />
  </g>
);

Control.propTypes = {
  positionControl: PropTypes.string.isRequired,
  numOfConditionsLabel: PropTypes.number.isRequired,
  yHeight: PropTypes.string.isRequired,
  controlTopBaseline: PropTypes.string.isRequired,
};

export default Control;
