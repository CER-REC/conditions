import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const WheelRayLegend = (props) => {
  let positionDegree = 0;

  const nextPosition = (numOfItemsAtIndex) => {
    const oldPositionDegree = positionDegree;
    const allocatedDegrees = numOfItemsAtIndex * props.degreesPerItem;
    positionDegree += allocatedDegrees;
    return oldPositionDegree;
  };

  const legendRenderer = (legendObj, index) => {
    let objectToRender;

    const position = nextPosition(legendObj.count);
    const stripePosition = (props.rotation) % 360;

    if (position > stripePosition - 10 - props.degreesPerItem) {
      objectToRender = (
        <text id="LetterLegend" key={index} className="textLegend" transform={`translate(371 209) rotate(${position + 10}, 0, 245)`}>
          {legendObj.legend}
        </text>);
    } else if (position < (stripePosition + 10) && position > (stripePosition - 10)) {
      objectToRender = (
        <text id="LetterLegend" key={index} className="textLegend chosen" transform={`translate(371 209) rotate(${stripePosition}, 0, 245)`}>
          HOLDER
        </text>
      );
    } else {
      objectToRender = (
        <text id="LetterLegend" key={index} className="textLegend" transform={`translate(371 209) rotate(${position - 10}, 0, 245)`}>
          {legendObj.legend}
        </text>
      );
    }
    return objectToRender;
  };

  if (!props.ringType) { return null; }
  return (
    <React.Fragment>
      {
        props.legendPositionArray.map((legendObj, index) => legendRenderer(legendObj, index))
      }
    </React.Fragment>
  );
};

WheelRayLegend.propTypes = {
  ringType: PropTypes.string.isRequired,
  legendPositionArray: PropTypes.arrayOf(PropTypes.shape({
    legend: PropTypes.string,
    count: PropTypes.number,
  })).isRequired,
  degreesPerItem: PropTypes.number.isRequired,
  rotation: PropTypes.number.isRequired,
};

export default WheelRayLegend;
