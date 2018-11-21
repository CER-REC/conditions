import React from 'react';
import PropTypes from 'prop-types';
import { XYFrame } from 'semiotic';

import './styles.scss';

const XAxis = (props) => {
  if (props.dateRange.length === 0) { return null; }

  return (
    <div className="x-axis">
      <XYFrame
        size={[props.width, props.height]}
        xAccessor="year"
        axes={[{ orient: 'bottom' }]}
        xExtent={[Math.min(...props.dateRange), Math.max(...props.dateRange)]}
        margin={
          {
            top: props.top,
            left: props.width / 2,
            bottom: props.bottom,
            right: props.right,
          }
        }
      />
      <span>Effective Date</span>
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
  height: 100,
  top: 55,
  bottom: 50,
  right: 20,
};

export default XAxis;
