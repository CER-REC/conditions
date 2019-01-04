import React from 'react';
import PropTypes from 'prop-types';
import FeatureFlag from '../../FeatureFlag';
import CircleContainer from '../../CircleContainer';

import './styles.scss';

const ProjectChart = (props) => {
  const conditionCount = props.graphData.reduce((acc, next) => (acc + next.count), 0);
  return (
    <div className={`ProjectChart ${props.selected ? 'selected' : ''}`}>
      {props.graphData.length === 0 ? <div className="ConditionPipe" /> : (
        <React.Fragment>
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
                color={props.selected ? condition.color : '#a1a8a7'}
                chartType={props.chartType}
              />
            ))}
          </div>
          <div className="ProjectName">
            { props.selected ? null : <p>{props.projectName}</p> }
          </div>
        </React.Fragment>
      )}
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
    color: PropTypes.string.isRequired,
  })),
  /** Selected class for styling */
  selected: PropTypes.bool,
};

ProjectChart.defaultProps = {
  selected: false,
  graphData: [],
  projectName: '',
};

export default ProjectChart;
