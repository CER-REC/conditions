import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const FeatureFlag = (props) => {
  const bar = (
    <div
      className="Bar"
      style={{ backgroundColor: props.color, content: '', width: `${props.count + 5}px` }}
      title={`${props.chartType} - ${props.name} - ${props.count}`}
    />);

  const tip = (<div className="FlagTip" style={{ borderLeftColor: props.color }} />);

  return (props.count > 10 ? (<div className="FeatureFlag">{bar}{tip}</div>) : (<div className="FeatureFlag">{bar}</div>));
};

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
