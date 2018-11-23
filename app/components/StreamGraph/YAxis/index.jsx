import React from 'react';
import PropTypes from 'prop-types';
import { VictoryAxis } from 'victory';

import './styles.scss';

const YAxis = (props) => {
  if (props.dateRange.length === 0) { return null; }

  return (
    <div className="y-axis">
    </div>
  );
};

YAxis.propTypes = {
  dateRange: PropTypes.arrayOf(PropTypes.number),
  top: PropTypes.number,
  bottom: PropTypes.number,
};

YAxis.defaultProps = {
  dateRange: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
  top: 55,
  bottom: 50,
};

export default YAxis;
