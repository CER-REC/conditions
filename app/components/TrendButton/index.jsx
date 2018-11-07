import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import StreamButton from './images/streamButton.png';
import BubbleButton from './images/bubbleButton.png';

const buttonImages = {
  theme: StreamButton,
  instrument: BubbleButton,
};

const TrendButton = (props) => {
  if (!buttonImages[props.encoding]) { return null; }
  return (
    <button className="TrendButton" onClick={props.onClick}>
      <img src={buttonImages[props.encoding]} alt="" />
      <span className="buttonText">
        Go to {props.encoding}<br />Trends
      </span>
    </button>
  );
};

TrendButton.propTypes = {
  encoding: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TrendButton;
