import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const WheelRayLegend = ({
  ringType, legendPositionArray, numOfItems, rotation,
}) => {
  const availDegreesForPlotting = 310;
  const degreesPerItem = availDegreesForPlotting / numOfItems;

  let positionDegree = 0;

  const nextPosition = (numOfItemsAtIndex) => {
    const oldPositionDegree = positionDegree;
    const allocatedDegrees = numOfItemsAtIndex * degreesPerItem;
    positionDegree += allocatedDegrees;
    return oldPositionDegree;
  };

  const legendRenderer = (legendObj) => {
    let objectToRender;

    const position = nextPosition(legendObj.count);
    const stripePosition = rotation;

    if (position > (stripePosition - 20 - degreesPerItem)
      && position < (stripePosition + 20 + degreesPerItem)) {
      objectToRender = (
        <g transform={`translate(371 209) rotate(${stripePosition}, 0, 245)`} >
          <text id="LetterLegend" className="textLegend" transform="rotate(270, 0, 245)">
            RAWR
          </text>
        </g>);
    } else {
      objectToRender = (
        <g transform={`translate(371 209) rotate(${position}, 0, 245)`} >
          <text id="LetterLegend" className="textLegend" transform="rotate(270, 0, 245)">
            {legendObj.legend}
          </text>
        </g>);
    }
    return objectToRender;
  };

  if (!ringType) { return null; }
  return (
    <g>
      {
        legendPositionArray.map(legendObj => legendRenderer(legendObj))
      }
    </g>
  );
};

WheelRayLegend.propTypes = {
  ringType: PropTypes.string.isRequired,
  legendPositionArray: PropTypes.arrayOf(PropTypes.shape({
    legend: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  })).isRequired,
  numOfItems: PropTypes.number.isRequired,
  rotation: PropTypes.number.isRequired,
};

export default WheelRayLegend;
