import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const LocationWheelMinimap = (props) => {
  return (
    <div className="LocationWheelMinimap">
      Hi!
    </div>
  );
};

LocationWheelMinimap.PropTypes = {
  province: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
};

export default LocationWheelMinimap;
