import React from 'react';
import PropTypes from 'prop-types';
import { VictoryAxis, VictoryLabel, VictoryArea, VictoryStack, VictoryCursorContainer, VictoryChart } from 'victory';

import './styles.scss';

const Streamgraph = (props) => {
  return (
    <div className="streamgraph">
      <h1>Total Conditions by Theme Over Time</h1>
      <VictoryChart
        containerComponent={
          <VictoryCursorContainer
            cursorLabelComponent={<VictoryLabel />}
          />
        }
      >
        <VictoryAxis
          label="Effective Date"
          tickValues={['valueMin', 'valueMax']}
        />
        <VictoryAxis
          dependentAxis
          label="Number of Conditions"
          tickValues={['min', 'max']}
        />
        <VictoryStack>
          {
            props.projectData.map(stream => (
              <VictoryArea
                data={[stream.date, stream.count]}
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
    id: PropTypes.string.isRequired,
    graphData: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
};

export default Streamgraph;
