import React from 'react';
import PropTypes from 'prop-types';
import FeatureFlag from './FeatureFlag';

const ProjectChart = props => (
  <div className="ProjectChart">
    { props.graphData.map(condition => (
      <FeatureFlag
        key={condition.name}
        count={condition.count}
        color={condition.color}
      />
    ))}
  </div>
);

ProjectChart.propTypes = {
  /** All of the projects condition data */
  graphData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
  })).isRequired,
};

export default ProjectChart;
