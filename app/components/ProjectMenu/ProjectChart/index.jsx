import React from 'react';
import PropTypes from 'prop-types';
import shortChartData from '../utitlities';
import FeatureFlag from './FeatureFlag';

const ProjectChart = (props) => {
  const sortedData = shortChartData(props.chartType, props.graphData);
  return (
    <div className="ProjectChart">
      { sortedData.map(condition => (
        <FeatureFlag
          key={condition.name}
          count={condition.count}
          color={condition.color}
        />
      ))}
    </div>
  );
};

ProjectChart.propTypes = {
  chartType: PropTypes.string.isRequired,
  graphData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
  })).isRequired,
};

export default ProjectChart;
