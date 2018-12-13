import React from 'react';
import PropTypes from 'prop-types';
import FeatureFlag from './FeatureFlag';

import './styles.scss';

const ProjectChart = props => (
  <div className={`ProjectChart ${props.selected ? 'selected' : ''}`}>
    <p>{props.graphData.length}</p>
    <div className="FlagWrapper">
      { props.graphData.map(condition => (
        <FeatureFlag
          key={condition.name}
          name={condition.name}
          count={condition.count}
          color={condition.color}
          chartType={props.chartType}
        />
      ))}
    </div>
    <p>{props.projectName}</p>
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
