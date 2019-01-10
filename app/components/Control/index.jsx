import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Control = props => (
  <g transform={props.positionControl} className="Control">
    <line
      strokeDasharray="4.051 4.051"
      x1="0"
      x2="0"
      y1={props.yHeight}
      y2="220"
      stroke="rgb(209, 5, 122)"
      strokeWidth="1"
    />
    <g transform={`translate(-10, ${props.yHeight - 10})`}>
      <path
        d="M 5 5 L 15 5 L 10 15 z"
        fill="rgb(209, 5, 122)"
      />
      <rect x="0" y="-5" width="20" height="10" fill="white" />
      <text x="10" y="5" textAnchor="middle">{props.numOfConditionsLabel}</text>
    </g>
  </g>
);

Control.propTypes = {
  positionControl: PropTypes.string.isRequired,
  numOfConditionsLabel: PropTypes.number.isRequired,
  yHeight: PropTypes.string,
};

Control.defaultProps = {
  yHeight: '20',
};

export default Control;
