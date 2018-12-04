import React from 'react';
import PropTypes from 'prop-types';
import { VictoryAxis, VictoryArea, VictoryStack, VictoryCursorContainer, VictoryChart } from 'victory';

import './styles.scss';

export const numOfConditionsLabel = point => Math.round(point.y);

export const roundDateLabel = t => Math.round(t);

const Streamgraph = (props) => {
  const numOfConditions = props.projectData.map(k => k.graphData.map(v => v.count));
  const numOfConditionsConcat = [].concat(...numOfConditions);

  const minConditionValue = Math.min(...numOfConditionsConcat);

  let conditionDates = props.projectData.reduce((acc, next) => {
    next.graphData.forEach(v => {
      if (!acc[v.date]) { acc[v.date] = 0; }
      acc[v.date] += v.count;
    });
    return acc;
  }, {});

  conditionDates = Object.values(conditionDates);
  const maxConditionValue = Math.max(...conditionDates);

  const streamLayer = props.projectData.map(v => (
    <VictoryArea
      data={v.graphData.map(k => ({ x: k.date, y: k.count }))}
      style={{ data: { fill: v.color } }}
      interpolation="natural"
    />
  ));

  return (
    <div className="streamgraph">
      <h1>Total Conditions by Theme Over Time</h1>
      <VictoryChart
        containerComponent={
          <VictoryCursorContainer
            cursorLabel={numOfConditionsLabel}
          />
        }
      >
        <VictoryAxis
          dependentAxis
          label="Number of Conditions"
          tickValues={[minConditionValue, maxConditionValue]}
        />
        <VictoryAxis
          label="Effective Date"
          tickFormat={roundDateLabel}
        />
        <VictoryStack>
          {streamLayer}
        </VictoryStack>
      </VictoryChart>
    </div>
  );
};

Streamgraph.propTypes = {
  projectData: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    graphData: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
};

export default Streamgraph;
