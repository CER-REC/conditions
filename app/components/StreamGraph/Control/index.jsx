import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class Control extends React.PureComponent {
  static propTypes = {
    position: PropTypes.string,
    zIndex: PropTypes.number,
    marginTop: PropTypes.string,
    marginLeft: PropTypes.string,
  };

  control() {
    return (
      <svg height="400px">
        <g transform="translate(30, 30)">
          <text x="15" y="15">{this.numOfConditionsLabel}</text>
          <line
            strokeDasharray="10, 5"
            x1="20"
            x2="20"
            y1="20"
            y2="330"
            stroke="magenta"
            strokeWidth="2"
            transform="scale(2)"
          />
          <path
            d="M 100 100 L 300 100 L 200 300 z"
            fill="magenta"
            transform="scale(0.2)"
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
          marginLeft: this.props.marginLeft,
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
  marginLeft: '',
};

export default Control;
