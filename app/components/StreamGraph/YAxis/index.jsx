import React from 'react';
import PropTypes from 'prop-types';
import { VictoryAxis } from 'victory';

import './styles.scss';

const YAxis = (props) => {
  if (props.conditions.length === 0) { return null; }

  return (
    <div className="y-axis">
      <VictoryAxis
        dependentAxis
        offsetX={200}
        domain={[Math.min(...props.conditions), Math.max(...props.conditions)]}
        tickValues={[Math.min(...props.conditions), Math.max(...props.conditions)]}
        label="Number of Conditions"
        style={{
          axis: { stroke: '#333333' },
          ticks: { stroke: '#333333', size: 5 },
          tickLabels: { fontSize: 11, padding: 5 },
        }}
      />
    </div>
  );
};

YAxis.propTypes = {
  conditions: PropTypes.arrayOf(PropTypes.number),
};

YAxis.defaultProps = {
  conditions: [0, 1436],
};

export default YAxis;
