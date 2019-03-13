import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

import BarContainer from '../../BarContainer';

const LocationRay = (props) => {
  // eslint-disable-next-line object-curly-newline
  const { height, width, items, searched, adjustRotationReference } = props;
  return (
    <g className="LocationRay">
      <BarContainer
        className="WheelBar"
        width={width}
        height={height}
        items={items}
        vertical
        standalone
      />
      {searched ? (
        <line
          className="searched"
          y2="27.9%"
          y1="23.6%"
          stroke="orange"
          strokeWidth="3px"
          style={{ transform: `rotate(-${90 - adjustRotationReference}deg)` }}
        />
      ) : null}
    </g>
  );
};

LocationRay.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    fill: PropTypes.string.isRequired,
  })).isRequired,
  searched: PropTypes.bool,
  adjustRotationReference: PropTypes.number.isRequired,
};

LocationRay.defaultProps = {
  searched: false,
};

export default LocationRay;
