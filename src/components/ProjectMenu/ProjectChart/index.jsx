import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FeatureFlag from '../../FeatureFlag';
import CircleContainer from '../../CircleContainer';

import { features } from '../../../constants';

import './styles.scss';

const ProjectChart = (props) => {
  const { graphData } = props;
  const conditionCount = graphData.reduce((acc, next) => (acc + next.count), 0);

  return (
    <div className={classNames('ProjectChart', { selected: props.selected, loading: props.loading })}>
      <div className="ConditionPipe">
        <CircleContainer size={24} className="ConditionCount">
          {props.loading || conditionCount < 0 ? '' : conditionCount}
        </CircleContainer>
      </div>
      <div className="FlagWrapper">
        <div className="FlagPole" />
        {graphData.map((condition, idx) => {
          let color;
          switch (props.chartType) {
            case 'legend':
              color = 'transparent';
              break;
            case 'instrument':
              color = features.instrument[idx];
              break;
            default:
              color = features[props.chartType][condition.name];
          }

          return (
            <FeatureFlag
              key={condition.name}
              name={condition.name}
              color={color}
              count={condition.count}
              chartType={props.chartType}
            />
          );
        })}
      </div>

      {props.selected
        ? (
          <div className="SelectedPipe" />
        )
        : (
          <div title={props.projectName} className="ProjectName"><p>{props.projectName}</p></div>
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
};

ProjectChart.defaultProps = {
  selected: false,
  graphData: [],
  projectName: '',
  loading: false,
};

export default ProjectChart;
