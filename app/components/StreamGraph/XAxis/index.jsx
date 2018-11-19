import React from 'react';
import PropTypes from 'prop-types';

const XAxis = (props) => {
  if (props.dateRange.length === 0) { return null; }
  const dateRange = [];
  return (
    <div className="x-axis">
      {dateRange}
    </div>
  );
};

XAxis.propsTypes = {
  dateRange: PropTypes.arrayOf(PropTypes.number).isRequired,
};

XAxis.defaultProps = {
  dateRange: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
};

export default XAxis;
