import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const ChartIndicator = (props) => {
  const lineY = 10;
  const circleExists = (props.radius <= 0)
    ? null
    : (
      <circle
        className="selectedCircle"
        cx={0}
        cy={(props.yBottom) + props.radius}
        r={props.radius + 2}
      />
    );
  if (props.display) {
    return (
      <g className="ChartIndicator" transform={`translate(${props.x}, ${props.yTop})`}>
        <path
          className="arrow"
          d="M 5 5 L 15 5 L 10 15 z"
          transform="translate(-10,0)"
        />
        <line
          className="line"
          x1={0}
          x2={0}
          y1={lineY}
          y2={props.yBottom}
        />
        {circleExists}
      </g>
    );
  }
  return null;
};

ChartIndicator.propTypes = {
  x: PropTypes.number.isRequired,
  yBottom: PropTypes.number.isRequired,
  yTop: PropTypes.number,
  radius: PropTypes.number,
  display: PropTypes.bool.isRequired,
};

ChartIndicator.defaultProps = {
  radius: 0,
  yTop: 0,
};

export default ChartIndicator;
