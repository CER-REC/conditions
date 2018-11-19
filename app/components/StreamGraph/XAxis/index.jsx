import React from 'react';
import PropTypes from 'prop-types';

const XAxis = (props) => {
  return (
    <div className="x-axis" />
  );
};

XAxis.propsTypes = {
  dateRange: PropTypes.arrayOf(PropTypes.string),
};

export default XAxis;
