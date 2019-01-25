import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BarContainer from '../../BarContainer';
import './styles.scss';

const RegionConditionChart = (props) => {
  const width = 400;
  const barWidth = width / props.featureData.length;
  if (props.featureData.length === 0) { return null; }
  const items = props.featureData.map(k => ({ value: k.count, fill: k.color }));
  return (
    <div className={classNames(
      'RegionConditionChart',
      props.className,
    )}
    >
      <BarContainer
        desc="description"
        title="title"
        size={barWidth}
        items={items}
        vert
        scale={1}
      />
    </div>
  );
};

RegionConditionChart.propTypes = {
  className: PropTypes.string.isRequired,
  featureData: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  })).isRequired,
};

export default RegionConditionChart;
