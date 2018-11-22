import React from 'react';
import PropTypes from 'prop-types';
import { VictoryAxis } from 'victory';

import './styles.scss';

const XAxis = (props) => {
  if (props.dateRange.length === 0) { return null; }

  return (
    <div className="x-axis">
      <VictoryAxis
        label="Effective Date"
        padding={{ top: props.top, bottom: props.bottom }}
        tickValues={props.dateRange}
        style={{
          axis: { stroke: '#333333' },
          axisLabel: { fontSize: 20, padding: 30 },
          ticks: { stroke: 'grey', size: 5 },
          tickLabels: { fontSize: 15, padding: 5 },
        }}
      />
    </div>
  );
};

XAxis.propTypes = {
  dateRange: PropTypes.arrayOf(PropTypes.number),
  width: PropTypes.number,
  height: PropTypes.number,
  top: PropTypes.number,
  bottom: PropTypes.number,
  right: PropTypes.number,
};

XAxis.defaultProps = {
  dateRange: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
  width: 600,
  height: 400,
  top: 55,
  bottom: 50,
  right: 20,
};

export default XAxis;