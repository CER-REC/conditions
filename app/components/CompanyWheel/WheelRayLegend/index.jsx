import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const WheelRayLegend = (props) => {
  const halfReservedDegress = props.reservedDegrees;
  let positionDegree = 0 + halfReservedDegress;
  const stripePosition = props.rotation;
  const reservedSpace = halfReservedDegress + props.degreesPerItem;
  const nextPosition = (numOfItemsAtIndex) => {
    const oldPositionDegree = positionDegree;
    positionDegree += numOfItemsAtIndex * props.degreesPerItem;
    return oldPositionDegree;
  };

  const legendRenderer = (legendObj, index) => {
    let position = nextPosition(legendObj.count);

    if (position < stripePosition - props.degreesPerItem) {
      position -= reservedSpace;
    } else if (position > stripePosition + props.degreesPerItem) {
      position += reservedSpace;
    } else {
      position = stripePosition;
    }
    return (
      <text key={index} className="TextLabels" transform={`translate(371 209) rotate(${position}, 0, 245)`}>
        {legendObj.legend}
      </text>
    );
  };

  return (
    <React.Fragment>
      { props.legendPositionArray.map((legendObj, index) => legendRenderer(legendObj, index)) }
    </React.Fragment>
  );
};

WheelRayLegend.propTypes = {
  legendPositionArray: PropTypes.arrayOf(PropTypes.shape({
    legend: PropTypes.string,
    count: PropTypes.number,
  })).isRequired,
  degreesPerItem: PropTypes.number.isRequired,
  rotation: PropTypes.number.isRequired,
  reservedDegrees: PropTypes.number.isRequired,
};

export default WheelRayLegend;
