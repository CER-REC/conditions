import React from 'react';
import PropTypes from 'prop-types';
import FeatureFlag from './FeatureFlag';

const ProjectChart = props => (
  <div className={`ProjectChart ${props.selected ? 'selected' : ''}`}>
    <span>{props.graphData.length}</span>
    { props.graphData.map(condition => (
      <FeatureFlag
        key={condition.name}
        name={condition.name}
        count={condition.count}
        color={condition.color}
        chartType={props.chartType}
      />
    ))}
    <span>{props.projectName}</span>
  </div>
);

ProjectChart.propTypes = {
  /** The project name */
  projectName: PropTypes.string.isRequired,
  /** The selected feature */
  chartType: PropTypes.string.isRequired,
  /** All of the projects condition data */
  graphData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
  })).isRequired,
  /** Selected class for styling */
  selected: PropTypes.bool,
};

ProjectChart.defaultProps = {
  selected: false,
};

export default ProjectChart;
