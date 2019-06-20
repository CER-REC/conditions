import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FeatureFlag from '../../FeatureFlag';
import CircleContainer from '../../CircleContainer';

import './styles.scss';

const determineColour = (relevant, filtered) => {
  if (relevant && filtered) {
    return ('RelevantAndFiltered');
  } if (relevant && !filtered) {
    return ('Relevant');
  } if (!relevant && filtered) {
    return ('Filtered');
  }
  return ('');
};

const ProjectChart = (props) => {
  const { graphData } = props;
  const conditionCount = graphData.reduce((acc, next) => (acc + next.count), 0);

  return (
    <div className={classNames('ProjectChart', { selected: props.selected, loading: props.loading })}>
      <div className="ConditionPipe">
        <CircleContainer size={24} className={classNames('ConditionCount', determineColour(props.relevantProjects[props.projectId], props.filteredProjects[props.projectId]))}>
          {props.loading || conditionCount < 0 ? '' : conditionCount}
        </CircleContainer>
      </div>
      <div className="FlagWrapper">
        <div className="FlagPole" />
        {graphData.map((condition, idx) => (
          <FeatureFlag
            key={condition.name}
            name={(props.chartType === 'instrument') ? idx : condition.name}
            count={condition.count}
            chartType={props.chartType}
          />
        ))}
      </div>

      {props.selected
        ? (
          <div className="SelectedPipe" />
        )
        : (
          <div className="ProjectName"><p>{props.projectName}</p></div>
        )
      }
    </div>
  );
};

ProjectChart.propTypes = {
  /** The project name */
  projectName: PropTypes.string,
  /** The selected feature */
  chartType: PropTypes.string.isRequired,
  /** All of the projects condition data */
  graphData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  })),
  /** Selected class for styling */
  selected: PropTypes.bool,
  /** A flag to animate fake data inside the chart and change condition count value */
  loading: PropTypes.bool,
  relevantProjects: PropTypes.arrayOf(PropTypes.bool),
  filteredProjects: PropTypes.arrayOf(PropTypes.bool),
  projectId: PropTypes.number.isRequired,
};

ProjectChart.defaultProps = {
  selected: false,
  graphData: [],
  projectName: '',
  loading: false,
  relevantProjects: [],
  filteredProjects: [],
};

export default ProjectChart;
