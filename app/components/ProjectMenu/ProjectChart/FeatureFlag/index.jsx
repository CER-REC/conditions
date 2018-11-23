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
  count: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default FeatureFlag;
