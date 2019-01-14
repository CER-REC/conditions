import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const FeatureFlag = (props) => {
  // max flag size is 30px
  const sizePerUnit = (30 / 10); // 30px of space, and 10 units is a full flag
  const flagSize = Math.min(props.count * sizePerUnit, 30);

  const bar = (
    <div
      className="Bar"
      style={{ backgroundColor: props.color, content: '', width: `${flagSize}px` }}
      title={`${props.chartType} - ${props.name} - ${props.count}`}
    />
  );

  const tip = (<div className="FlagTip" style={{ borderLeftColor: props.color }} />);

  return <div className="FeatureFlag">{bar}{props.count > 10 ? tip : null}</div>;
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
