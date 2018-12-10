import React from 'react';
import {Spring, animated } from 'react-spring';
import PropTypes from 'prop-types';
import './styles.scss';

import Ring from './Ring';
import WheelRayLegend from './WheelRayLegend';

const CompanyWheel = ({ ringType, itemsData, rotation }) => {
  if (typeof ringType === 'undefined') { return null; }

  const initialPosition = 90;
  const rayRotation = (450 - (rotation % 360)) % 360;

  const getLocationItemsCount = () => {
    let count = 0;
    for (let i = 0; i < itemsData.length; i += 1){
      count += itemsData[i].count;
    }
    return count + 2;
  };

  const numOfLegendItems = ringType === 'normal' ? itemsData.length + 2 : getLocationItemsCount();

  return (
    <div className="wheelContainer" style={{ transform: `rotate(${rotation + initialPosition}deg)`}} >
        <Spring
            native
            from={{ transformOrigin: '50%', transform: `rotate(${this.state.oldRotation}deg)`}}
            to={{transformOrigin: '50%', transform: `rotate(${this.state.newRotation}deg` }}
          >
            {props=> <animated.div style={props}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 860">
              <g id="Group_3" data-name="Group 3" transform="translate(-27.5 -122.8)">
                <g id="OuterLimitCircle" className="cls-2" transform="translate(27.5 125.5)">
                  <circle className="cls-1" cx="430" cy="430" r="426" />
                </g>
                <g id="wheelGroup" data-name="wheelGroup" transform="translate(86 102)">
                  <g id="RayCircle" className="cls-2" transform="translate(107.5 189.5)">
                    <circle className="cls-1" cx="264" cy="264" r="263.5" />
                  </g>
                  <Ring ringType={ringType} />
                  <WheelRayLegend
                    className="wheelRayLegendContainer"
                    ringType={ringType}
                    legendPositionArray={itemsData}
                    numOfItems={numOfLegendItems}
                    rotation={rayRotation}
                  />
                </g>
              </g>
            </svg>
            </animated.div>}
      </Spring>
    </div>
  );
};

CompanyWheel.propTypes = {
  ringType: PropTypes.string.isRequired,
  itemsData: PropTypes.arrayOf(PropTypes.object).isRequired,
  rotation: PropTypes.number.isRequired,
};

export default CompanyWheel;
