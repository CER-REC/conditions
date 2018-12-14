import React from 'react';
import { Spring, animated } from 'react-spring';
import PropTypes from 'prop-types';
import './styles.scss';

import Ring from './Ring';
import WheelRayLegend from './WheelRayLegend';

// The rotation of the legend centered if needed is transformOrigin: '43.25% 52.7%'
class CompanyWheel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      oldRotation: 90,
      newRotation: 90,
      oldRayRotation: 0,
      newRayRotation: 0,
    };
  };

  calcRayRotation = (newWheelRotation) => (450 - (newWheelRotation % 360)) % 360;

  getLocationItemsCount = () => {
    let count = 0;
    for (let i = 0; i < this.props.itemsData.length; i += 1) {
      count += this.props.itemsData[i].count;
    }
    return count + 2;
  };
  
  onSpinClick = () => {
    let newRotation = this.state.newRayRotation + Math.floor(Math.random() * 360);
    let newRayRotation = this.calcRayRotation(newRotation);
    this.setState({oldRayRotation: this.state.newRayRotation, oldRotation: this.state.newRotation},
    this.setState({ newRotation, newRayRotation })
    );
  };

  numOfLegendItems = this.props.ringType === 'company' ? this.props.itemsData.length : this.getLocationItemsCount();

  render(){ 
    return (
      <div className="wheelContainer">
        <Spring native
          config={{ tension: 50, clamp: true, mass: 0.7 }}
          from={{ transformOrigin: '50%', transform:`rotate(${this.state.oldRotation}deg)`}}
          to={{transform:`rotate(${this.state.newRotation}deg)`}}
        >
          { props => (
            <animated.div style={props} className="movingContainer">
              <svg viewBox="0 0 860 860">
                <g id="Group_3" data-name="Group 3" transform="translate(-27.5 -122.8)">
                  <g id="OuterLimitCircle" className="cls-2" transform="translate(27.5 125.5)">
                    <circle className="cls-1" cx="430" cy="430" r="426" />
                  </g>
                  <g id="wheelGroup" data-name="wheelGroup" transform="translate(86 102)">
                    <g id="RayCircle" className="cls-2" transform="translate(107.5 189.5)">
                      <circle className="cls-1" cx="264" cy="264" r="263.5" />
                    </g>
                    <Ring  ringType={this.props.ringType}></Ring>
                    <Spring to={{ rayRotation: this.state.newRayRotation}}>
                      { props =>
                          <WheelRayLegend
                            rotation= {props.rayRotation}
                            ringType={this.props.ringType}
                            legendPositionArray={this.props.itemsData}
                            numOfItems={this.numOfLegendItems}
                          />
                      }
                    </Spring>
                  </g>
                </g>
              </svg>
            </animated.div>
          )
          }
        </Spring>
        <button className="pullToSpin" onClick={this.onSpinClick} >Spin that wheel</button>
      </div>
    );
  }
}

CompanyWheel.propTypes = {
  ringType: PropTypes.string.isRequired,
  itemsData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

CompanyWheel.defaultProps = {
  ringType: 'company',
  itemsData: [{}],
};

export default CompanyWheel;
