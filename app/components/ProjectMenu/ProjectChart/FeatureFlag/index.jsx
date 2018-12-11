import React from 'react';
import PropTypes from 'prop-types';

const FeatureFlag = props => (
  <div
    className="FeatureFlag"
    style={{ backgroundColor: props.color }}
    title={`${props.chartType} - ${props.name} - ${props.count}`}
  >
    &nbsp;
  </div>
);

FeatureFlag.propTypes = {
  /** The selected feature */
  chartType: PropTypes.string.isRequired,
  /** The name of the condition */
  name: PropTypes.string.isRequired,
  /** The amount of conditions */
  count: PropTypes.number.isRequired,
  /** color of the flag item */
  color: PropTypes.string.isRequired,
};

export default FeatureFlag;
