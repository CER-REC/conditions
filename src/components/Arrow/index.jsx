import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss';

const Arrow = (props) => {
  const firstPath, secondPath, triangle;

  if (props.orientation === 'Up'){
    firstPath = 'M 12 5 6.3 16';
    secondPath = 'M 12 5 17.7 16';
    triangle = 'M 11.55 4.7 L 12 6 L 12.45 4.7';
  } else if (props.orientation === 'Down'){
    firstPath = 'M 12 19 6.3 8';
    secondPath = 'M 12 19 17.7 8';
    triangle = 'M 11.55 19.3 L 12 18 L 12.45 19.3';

  } else if (props.orientation === 'Right'){
    firstPath = 'M 5 12 16 6.3';
    secondPath = 'M 5 12 16 17.7';
    triangle = 'M 4.7 11.55 L 6 12 L 4.7 12.45';

  } else if (props.orientation === 'Left'){
    firstPath = 'M 19 12 8 6.3 ';
    secondPath = 'M 19 12 8 17.7 ';
    triangle = 'M 19.3 11.55 L 18 12 L 19.3 12.45 ';
  } 
  return(
  <div
    className={classNames(
      'Arrow',
      props.className,
      { elevated: props.elevated, disabled: props.disabled },
    )}
    style={{
      width: props.size,
      height: props.size,
    }}
  >
  
    <svg class="arrow" width="24" height="24">
            <circle cx="12" cy="12" r="11" stroke="blue" stroke-width="0.7" fill="none" />
            <path d={firstPath} stroke="red" stroke-width="1.3" fill="none"></path>
            <path d={secondPath} stroke="red" stroke-width="1.3" fill="none"></path>
            <path d={triangle} fill= "red"/>
    </svg>
  </div>
);
  };
Arrow.propTypes = {
  orientation: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Arrow.defaultProps = {
  orientation: 'Up',
  className: '',
};

export default Arrow;
