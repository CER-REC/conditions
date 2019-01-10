import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Controller = (props) => {
  const svgDefaultHeight = (props.yend + props.ystart);
  const svgHeight = (props.radius) ? svgDefaultHeight + props.radius * 2 : svgDefaultHeight;
  const svgWidth = (props.radius) ? (props.radius * 2) : 20;
  const pathTransform = (props.radius) ? (`translate(${props.radius - 10}, 5)`) : 'translate(0, 0)';
  const lineX = (props.radius) ? (props.radius) : 10;
  const lineY = (props.radius) ? 15 : 10;
  const circleExists = (props.radius) ? (
    <circle className="selectedCircle" cx={props.radius} cy={props.yend + props.radius} r={props.radius} />)
    : (null);
  return (
    <div className="Controller">
      <svg height={svgHeight} width={svgWidth} transform={`translate(${props.x}, ${props.ystart})`}>
        <path className="arrow" d="M 5 5 L 15 5 L 10 15 z" transform={pathTransform} />
        <line className="line" x1={lineX} x2={lineX} y1={lineY} y2={props.yend} />
        {circleExists}
      </svg>
    </div>
  );
};

Controller.propTypes = {
  x: PropTypes.number.isRequired,
  yend: PropTypes.number.isRequired,
  ystart: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
};

export default Controller;
