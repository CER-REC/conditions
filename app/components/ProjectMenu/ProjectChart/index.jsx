import React from 'react';
import PropTypes from 'prop-types';
import shortChartData from '../utitlities';

const ProjectChart = (props) => {
  const sortedData = shortChartData(props.chartType, props.graphData);
  return (
    <div className="ProjectChart">
      { sortedData.map(condition => (
        <div
          className="FeatureFlag"
          key={condition.name}
        >
          {condition.name}
        </div>
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
