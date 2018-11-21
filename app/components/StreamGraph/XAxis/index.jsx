import React from 'react';
import PropTypes from 'prop-types';
import { XYFrame } from 'semiotic';

const XAxis = (props) => {
  if (props.dateRange.length === 0) { return null; }

  return (
    <div>
      <XYFrame
        size={[props.width, props.height]}
        points={[{ price: 1.25, size: 150 }, { price: 2.25, size: 120 }]}
        pointStyle={{ fill: 'blue' }}
        xAccessor="price"
        yAccessor="size"
      />
      <span>Effective Date</span>
    </div>
  );
};

XAxis.propTypes = {
  dateRange: PropTypes.arrayOf(PropTypes.number),
  width: PropTypes.number,
  height: PropTypes.number,
};

XAxis.defaultProps = {
  dateRange: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
  width: 200,
  height: 100,
};

export default XAxis;
