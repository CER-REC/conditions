import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const WheelRayLegend = (props) => {
  let positionDegree = 0;
  const reservedDegrees = 10;
  const stripePosition = props.rotation;

  const nextPosition = (numOfItemsAtIndex) => {
    const oldPositionDegree = positionDegree;
    const allocatedDegrees = numOfItemsAtIndex * props.degreesPerItem;
    positionDegree += allocatedDegrees;
    return oldPositionDegree;
  };

  const legendRenderer = (legendObj, index) => {
    let position = nextPosition(legendObj.count);

    if (position > stripePosition - reservedDegrees - props.degreesPerItem) {
      position += reservedDegrees;
    } else if (
      position < (stripePosition + reservedDegrees) && position > (stripePosition - reservedDegrees)
    ) {
      position = stripePosition;
    } else {
      position -= reservedDegrees;
    }
    return (
      <text id="LetterLegend" key={index} className="TextLabels" transform={`translate(371 209) rotate(${position}, 0, 245)`}>
        {legendObj.legend}
      </text>
    );
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
  // eslint-disable-next-line react/no-unused-prop-types
  rotation: PropTypes.number.isRequired,
};

export default WheelRayLegend;
