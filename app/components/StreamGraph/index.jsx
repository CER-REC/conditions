import React from 'react';
import PropTypes from 'prop-types';
import { VictoryAxis, VictoryArea, VictoryStack, VictoryCursorContainer, VictoryChart } from 'victory';

import './styles.scss';

export const numOfConditionsLabel = point => Math.round(point.y);
console.log(numOfConditionsLabel(Math.round(4.3)));

const Streamgraph = (props) => {
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
          tickValues={[0, 1]}
        />
        <VictoryAxis
          label="Effective Date"
        />
        <VictoryStack
          colorScale={[props.projectData.color]}
        >
          {
            props.projectData.map(stream => (
              <VictoryArea
                data={{ x: stream.date, y: stream.count }}
                interpolation="natural"
              />
            ))
          }
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
