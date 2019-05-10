import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Arrow = (props) => {
  let line;

  if (props.orientation === 'Up') {
    line = ' 5.3, 16 11,5 16.7,16 ';
  } else if (props.orientation === 'Down') {
    line = ' 5.3, 8 11,19 16.7,8 ';
  } else if (props.orientation === 'Left') {
    line = ' 16,6.3 5,12 16,17.7 ';
  } else if (props.orientation === 'Right') {
    line = ' 8,6.3 18,12 8,17.7 ';
  }
  return (
    <div className="Arrow">
      <svg width="24" height="24" className="svg">
        <polyline points={line} fill="none" />
      </svg>
    </div>
  );
};
Arrow.propTypes = {
  orientation: PropTypes.string.isRequired,
};

export default Arrow;
