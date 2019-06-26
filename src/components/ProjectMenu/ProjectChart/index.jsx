import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FeatureFlag from '../../FeatureFlag';
import CircleContainer from '../../CircleContainer';

import './styles.scss';

const ProjectChart = (props) => {
  const { graphData, numberOfConditions } = props;
  return (
    <div className={classNames('ProjectChart', { selected: props.selected, loading: props.loading })}>
      <div className="ConditionPipe">
        <CircleContainer
          size={24}
          className={classNames('ConditionCount', {
            filtered: props.filteredProjectLookup[props.projectId],
            relevant: props.relevantProjectLookup[props.projectId],
          })}
        >
          {props.loading || numberOfConditions < 0 ? '' : numberOfConditions}
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
  numberOfConditions: PropTypes.number,
  /** Selected class for styling */
  selected: PropTypes.bool,
  /** A flag to animate fake data inside the chart and change condition count value */
  loading: PropTypes.bool,
  relevantProjectLookup: PropTypes.arrayOf(PropTypes.bool),
  filteredProjectLookup: PropTypes.arrayOf(PropTypes.bool),
  projectId: PropTypes.number.isRequired,
};

ProjectChart.defaultProps = {
  selected: false,
  graphData: [],
  projectName: '',
  loading: false,
  numberOfConditions: 0,
  relevantProjectLookup: [],
  filteredProjectLookup: [],
};

export default ProjectChart;
