import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const ChartIndicator = (props) => {
  const pathTransform = (props.radius > 0)
    ? (`translate(${props.radius - 10}, 5)`) : 'translate(0, 0)';
  const lineX = (props.radius > 0)
    ? (props.radius) : 10;
  const lineY = (props.radius > 0)
    ? 15 : 10;
  const circleExists = (props.radius <= 0)
    ? null
    : (
      <circle
        className="selectedCircle"
        cx={props.radius}
        cy={props.yBottom + props.radius}
        r={props.radius}
      />
    );
  return (
    <g className="ChartIndicator" transform={`translate(${props.x}, ${props.yTop})`}>
      <path
        className="arrow"
        d="M 5 5 L 15 5 L 10 15 z"
        transform={pathTransform}
      />
      <line
        className="line"
        x1={lineX}
        x2={lineX}
        y1={lineY}
        y2={props.yBottom}
      />
      {circleExists}
    </g>
  );
};

ChartIndicator.propTypes = {
  x: PropTypes.number.isRequired,
  yBottom: PropTypes.number.isRequired,
  yTop: PropTypes.number.isRequired,
  radius: PropTypes.number,
};

ChartIndicator.defaultProps = {
  radius: 0,
};

export default ChartIndicator;
