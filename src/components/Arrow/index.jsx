import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Arrow = (props) => {
  let firstPath, secondPath, triangle;

  if (props.orientation === 'Up'){
    firstPath = 'M 12 5 6.3 16';
    secondPath = 'M 12 5 17.7 16';
    triangle = 'M 11.55 4.7 L 12 6 L 12.45 4.7';
  } else if (props.orientation === 'Down'){
    firstPath = 'M 12 19 6.3 8';
    secondPath = 'M 12 19 17.7 8';
    triangle = 'M 11.55 19.3 L 12 18 L 12.45 19.3';

  } else if (props.orientation === 'Left'){
    firstPath = 'M 5 12 16 6.3';
    secondPath = 'M 5 12 16 17.7';
    triangle = 'M 4.7 11.55 L 6 12 L 4.7 12.45';

  } else if (props.orientation === 'Right'){
    firstPath = 'M 19 12 8 6.3 ';
    secondPath = 'M 19 12 8 17.7 ';
    triangle = 'M 19.3 11.55 L 18 12 L 19.3 12.45 ';
  } 
  return(
  <div className="Arrow">
  
    <svg width="24" height="24">
            <path d={firstPath} stroke={props.color} strokeWidth="1.3" fill="none"></path>
            <path d={secondPath} stroke={props.color} strokeWidth="1.3" fill="none"></path>
            <path d={triangle} fill= {props.color}/>
    </svg>
  </div>
  );
  };
Arrow.propTypes = {
  orientation: PropTypes.string.isRequired,
  color: PropTypes.string,

};

Arrow.defaultProps = {
  className: '',
  orientation: 'Up',
  color: 'red',

};

export default Arrow;
