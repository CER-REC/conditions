import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class Control extends React.PureComponent {
  static propTypes = {
    position: PropTypes.string,
    zIndex: PropTypes.number,
    marginTop: PropTypes.string,
    x1: PropTypes.string,
    x2: PropTypes.string,
    y1: PropTypes.string,
    y2: PropTypes.string,
    moveCursor: PropTypes.string,
    numOfConditionsLabel: PropTypes.number.isRequired,
  };

  control() {
    return (
      <svg height="100%">
        <g transform={`scale(1.5)${this.props.moveCursor}`}>
          <text x="15" y="15">{this.props.numOfConditionsLabel}</text>
          <line
            strokeDasharray="8, 4"
            x1={this.props.x1}
            x2={this.props.x2}
            y1={this.props.y1}
            y2={this.props.y2}
            stroke="magenta"
            strokeWidth="1"
          />
          <path
            d="M 5 5 L 15 5 L 10 15 z"
            fill="magenta"
            transform="translate(10, 10)"
          />
        </g>
      </svg>
    );
  }

  render() {
    return (
      <div
        className="control"
        style={{
          height: '100%',
          position: this.props.position,
          zIndex: this.props.zIndex,
          marginTop: this.props.marginTop,
        }}
      >
        {this.control()}
      </div>
    );
  }
}

Control.defaultProps = {
  position: '',
  zIndex: 0,
  marginTop: '',
  x1: '20',
  x2: '20',
  y1: '20',
  y2: '200',
  moveCursor: '',
};

export default Control;
