import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

const WheelRay = (props) => {
  const height = '163px';
  const width = `${props.degreesPerItem + 1}px`;
  const halfReservedDegrees = props.reservedDegrees / 2;
  let positionDegree = 0;
  const stripePosition = (90 + props.rotation) % 360;
  const nextPosition = () => {
    const oldPositionDegree = positionDegree;
    positionDegree += props.degreesPerItem;
    return oldPositionDegree;
  };

  const rayRenderer = (item, index) => {
    let position = nextPosition();
    let fill = 'red';

    if (position < stripePosition - halfReservedDegrees + props.degreesPerItem
      && position > stripePosition - halfReservedDegrees - props.degreesPerItem) {
      position = stripePosition;
      fill = 'purple';
    } else if (position <= stripePosition - halfReservedDegrees + props.degreesPerItem) {
      fill = 'blue';
      position -= props.degreesPerItem;
    } else if (position >= stripePosition - halfReservedDegrees - props.degreesPerItem) {
      fill = 'pink';
      position += props.reservedDegrees;
    }

    return (
      <rect fill={fill} y="-181" height={height} width={width} key={index} transform={`translate(371 209) rotate(${position % 360}, 0, 245)`} />
    );
  };

  return (
    <React.Fragment>
      { props.itemsArray.map((item, index) => rayRenderer(item, index)) }
    </React.Fragment>
  );
};

WheelRay.propTypes = {
  degreesPerItem: PropTypes.number.isRequired,
  reservedDegrees: PropTypes.number.isRequired,
  rotation: PropTypes.number.isRequired,
  itemsArray: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default WheelRay;
