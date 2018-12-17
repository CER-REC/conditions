import React from 'react';
import PropTypes from 'prop-types';
import FeatureFlag from './FeatureFlag';
import CircleContainer from '../../CircleContainer';

import './styles.scss';

const ProjectChart = (props) => {
  let conditionCount = 0;
  props.graphData.forEach((project) => {
    conditionCount += project.count;
  });
  return (
    <div className={`ProjectChart ${props.selected ? 'selected' : ''}`}>
      <div className="ConditionPipe">
        <CircleContainer
          size="24px"
          className="ConditionCount"
        >
          {conditionCount}
        </CircleContainer>
      </div>
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
      <div className="ProjectName">
        { props.selected ? null : <p>{props.projectName}</p> }
      </div>
    </div>
  );
};

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
