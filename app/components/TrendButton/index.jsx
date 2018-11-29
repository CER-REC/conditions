import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import handleInteraction from '../../utilities/handleInteraction';
import StreamGraph from '../StreamGraphs';
import StreamButton from './images/streamButton.png';
import BubbleButton from './images/bubbleButton.png';

const TrendButton = (props) => {
  if (props.selectedFeature.length === 0) { return null; }
  return (
    <div className="trendButton">
      <button {...handleInteraction(props.onClick)}>
        {props.streamGraphData !== null ?
        (
          <div className="streamGraphBackground">
            <StreamGraph />
            <svg x="0px" y="0px" viewBox="0 0 31.49 31.49">
              <path
                d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111
                C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587
                c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z"
              />
            </svg>
          </div>
          )
        :
          <div className="staticBackground">
            <img
              src={(props.selectedFeature === 'Instrument' ? BubbleButton : StreamButton)}
              alt=""
            />
          </div>
           }
        <div className="buttonText">
          <span>
          Go to {props.selectedFeature} <br /> Trends
          </span>
        </div>
      </button>
    </div>
  );
};

export default TrendButton;

TrendButton.propTypes = {
  selectedFeature: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  streamGraphData: PropTypes.arrayOf(PropTypes.number),
};

TrendButton.defaultProps = {
  streamGraphData: null,
};
