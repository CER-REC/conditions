import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class Control extends React.PureComponent {
  static propTypes = {
    positionControl: PropTypes.string.isRequired,
    numOfConditionsLabel: PropTypes.number.isRequired,
  };

  render() {
    return (
      <g transform={this.props.positionControl}>
        <text x="15" y="15">{this.props.numOfConditionsLabel}</text>
        <line
          strokeDasharray="8, 4"
          x1="20"
          x2="20"
          y1="20"
          y2="220"
          stroke="magenta"
          strokeWidth="1"
        />
        <path
          d="M 5 5 L 15 5 L 10 15 z"
          fill="magenta"
          transform="translate(10, 10)"
        />
      </g>
    );
  }
}

export default Control;
