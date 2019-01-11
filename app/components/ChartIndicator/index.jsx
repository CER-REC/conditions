import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const ChartIndicator = (props) => {
  const svgDefaultHeight = (props.yBottom + props.yTop);
  const svgHeight = (props.radius > 0)
    ? svgDefaultHeight + props.radius * 2
    : svgDefaultHeight;
    // TODO: Remove once integrated with parent svg
  const svgWidth = (props.radius > 0)
    ? (props.radius * 2) : 20;
    // TODO: Remove once integrated with parent svg
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
    // TODO: Remove svg tag once integrated with parent svg
    <svg height={svgHeight} width={svgWidth} className="ChartIndicator" transform={`translate(${props.x}, ${props.yTop})`}>
      <g>
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
    </svg>
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
