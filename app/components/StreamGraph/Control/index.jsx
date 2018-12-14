import React from 'react';
// import PropTypes from 'prop-types';

import './styles.scss';

class Control extends React.PureComponent {
  control() {
    return (
      <div
        className="streamgraph-control"
        style={{
          position: 'absolute',
          zIndex: 9,
          marginTop: '-485px',
          marginLeft: '300px',
          height: '100%',
        }}
      >
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
      </div>
    );
  }

  render() {
    return (
      <div className="control">
        {this.control()}
      </div>
    );
  }
}

export default Control;
