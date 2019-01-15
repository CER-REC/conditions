import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

class ChartIndicator extends React.PureComponent {
  static propTypes = {
    x: PropTypes.number.isRequired,
    yBottom: PropTypes.number.isRequired,
    yTop: PropTypes.number,
    radius: PropTypes.number,
    display: PropTypes.bool.isRequired,
    onDragStart: PropTypes.func.isRequired,
    onDragMove: PropTypes.func.isRequired,
    onDragStop: PropTypes.func.isRequired,
  };

  static defaultProps = {
    yTop: 0,
    radius: 0,
  }

  render() {
    const lineY = 10;
    const circleExists = (this.props.radius <= 0)
      ? null
      : (
        <circle
          className="selectedCircle"
          cx={0}
          cy={(this.props.yBottom) + this.props.radius}
          r={this.props.radius + 2}
        />
      );
    if (this.props.display) {
      return (
        <g
          draggable="true"
          onMouseDown={this.props.onDragStart}
          onMouseMove={this.props.onDragMove}
          onMouseUp={this.props.onDragStop}
          className="ChartIndicator"
          transform={`translate(${this.props.x}, ${this.props.yTop})`}
        >
          <rect fill="transparent" draggable="true" x="-250" width="500" height="100" />
          <path
            tabIndex="0"
            className="arrow"
            d="M 5 5 L 15 5 L 10 15 z"
            transform="translate(-10,0)"
          />
          <line
            className="line"
            x1={0}
            x2={0}
            y1={lineY}
            y2={this.props.yBottom}
          />
          {circleExists}
        </g>
      );
    }
    return null;
  }
}

export default ChartIndicator;
