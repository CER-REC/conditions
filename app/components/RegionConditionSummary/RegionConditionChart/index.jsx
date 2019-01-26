import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BarContainer from '../../BarContainer';

const RegionConditionChart = (props) => {
  if (props.featureData.length === 0) { return null; }
  const width = 350;
  const barWidth = width / props.featureData.length;
  const items = props.featureData.map(k => ({ value: k.count, fill: k.color }));
  return (
    <div className={classNames(
      'RegionConditionChart',
      props.className,
    )}
    >
      <BarContainer
        size={barWidth}
        items={items}
        vert
        scale={1}
      />
    </div>
  );
};

RegionConditionChart.propTypes = {
  className: PropTypes.string,
  featureData: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  })).isRequired,
};

RegionConditionChart.defaultProps = {
  className: '',
};

export default RegionConditionChart;
