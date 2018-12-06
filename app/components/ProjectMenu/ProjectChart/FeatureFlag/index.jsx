import React from 'react';
import PropTypes from 'prop-types';

const FeatureFlag = props => (
  <div
    className="FeatureFlag"
    style={{ backgroundColor: props.color }}
  >
    {props.count}
  </div>
);

FeatureFlag.propTypes = {
  /** The amount of condtions */
  count: PropTypes.number.isRequired,
  /** color of the flag item */
  color: PropTypes.string.isRequired,
};

export default FeatureFlag;
