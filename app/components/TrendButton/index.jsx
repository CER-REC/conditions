import React from 'react';
import PropTypes from 'prop-types';
import handleInteraction from '../../utilities/handleInteraction';
import StreamGraph from '../StreamGraphs';


const TrendButton = (props) => {
  if (props.selectedFeature.length === 0) { return null; }
  return (
    <div className="trendButton">
      <button {...handleInteraction(props.onChange, null)}>
        {props.streamGraphData === 'true' ?
        (
          <div className="streamGraphBackground">
            <StreamGraph />
          </div>
          )
        :
          <div className="staticBackground">
            <img
              src=""
              alt=""
            />
          </div>
           }
        <div className="buttonText">
          <span > Go to {props.selectedFeature} --> <br /> Trends </span>
        </div>

      </button>
    </div>
  );
};

export default TrendButton;

TrendButton.propTypes = {
  selectedFeature: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

TrendButton.defaultProps = {
  selectedFeature: '',
};
