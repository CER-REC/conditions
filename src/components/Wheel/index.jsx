/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Spring, animated } from 'react-spring/renderprops';
import PropTypes from 'prop-types';
import './styles.scss';

import Ring from './Ring';
import PullToSpin from './PullToSpin';
import WheelRay from './WheelRay';
import { browseByType } from '../../proptypes';
import WheelList from './WheelList';

const reservedDegrees = 12;

const AnimatedWheelRay = animated(WheelRay);
const AnimatedWheelList = animated(WheelList);

class Wheel extends React.Component {
  static propTypes = {
    wheelType: browseByType.isRequired,
    wheelData: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedRay: PropTypes.number,
    selectRay: PropTypes.func.isRequired,
    wheelMotionTrigger: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selectedRay: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      oldRotation: 0,
      newRotation: 0,
      degreesPerItem: 0,
      selectedIndex: 0,
      wheelModifiers: {
        spin: false,
      },
    };
  }

  static getDerivedStateFromProps(props, prevState) {
    const items = props.wheelData;
    if (!items.length > 0) return { ...prevState };
    if (props.selectedRay === null) {
      props.selectRay(items[Math.floor(Math.random() * items.length)].id);
    }
    const degreesPerItem = ((360 - reservedDegrees) / (items.length));
    const selectedIndex = items.findIndex(v => v.id === props.selectedRay);
    const { wheelModifiers } = prevState;
    let { newRotation } = prevState;
    if (wheelModifiers.spin || prevState.selectedIndex === -1) {
      const minimumRotation = 360 - (prevState.newRotation % 360);
      newRotation += minimumRotation + selectedIndex * (360 / items.length);
      wheelModifiers.spin = true;
    } else {
      wheelModifiers.spin = false;
      const diff = Math.abs(selectedIndex - prevState.selectedIndex);
      if (diff < items.length - 1) {
        const adding = (selectedIndex - prevState.selectedIndex) * (360 / items.length);
        newRotation += adding;
      } else {
        newRotation += -(Math.sign(selectedIndex - prevState.selectedIndex) * (360 / items.length));
      }
    }
    return {
      degreesPerItem,
      selectedIndex,
      oldRotation: prevState.newRotation || 0,
      newRotation,
      wheelModifiers,
    };
  }

  shouldComponentUpdate(prevProps) {
    return prevProps.wheelType !== this.props.wheelType
      || prevProps.selectedRay !== this.props.selectedRay
      || prevProps.wheelData !== this.props.wheelData;
  }

  onClickSpin = () => {
    const items = this.props.wheelData;
    const randomNum = Math.floor(Math.random() * items.length);
    this.setState(prevState => ({ wheelModifiers: { ...prevState.wheelModifiers, spin: true } }));
    this.props.selectRay(items[randomNum].id);
  };

  onChange = (index) => {
    this.props.selectRay(this.props.wheelData[index].id);
  };

  getIndex = (currentRotation) => {
    const { length } = this.props.wheelData;
    const index = Math.round(((360 + (currentRotation % 360)) % 360) / (360 / length));
    return (length + (length - index)) % length;
  };

  stopWheel = (index) => {
    this.setState(prevState => (
      {
        newRotation: prevState.newRotation + (index * (360 / this.props.wheelData.length)),
        wheelModifiers: { ...prevState.wheelModifiers, needsSpin: false },
      }
    ));
  };

  shouldRender = componentRenderFn => (
    this.props.wheelData.length > 0 ? componentRenderFn() : null)
  ;

  render() {
    return (
      <div className="Wheel">
        <Spring
          native
          immediate={!this.state.wheelModifiers.spin}
          config={{ tension: 30, friction: 20, precision: 0.1, easing: t => t * t * t * t * t }}
          onStart={() => {
            this.state.wheelModifiers.spin = false;
            this.props.wheelMotionTrigger(true);
          }}
          onRest={() => { this.props.wheelMotionTrigger(false); }} // props.showInfo()}
          from={{ rotation: -this.state.oldRotation }}
          to={{ rotation: -this.state.newRotation }}
        >
          {(props) => {
            const currentIndex = props.rotation.interpolate(r => this.getIndex(r));
            return (
              <div className="svgContainer">
                <animated.div style={{ transform: props.rotation.interpolate(r => `rotate(${r.toFixed(2)}deg)`) }} className="MovingContainer">
                  <svg viewBox="0 0 860 860">
                    <Ring ringType={this.props.wheelType} />
                    {this.shouldRender(() => (
                      <AnimatedWheelRay
                        onChange={this.onChange}
                        stopWheel={this.stopWheel}
                        wheelType={this.props.wheelType}
                        items={this.props.wheelData}
                        degreesPerItem={this.state.degreesPerItem}
                        reservedDegrees={reservedDegrees}
                        currentIndex={currentIndex}
                        rotation={props.rotation.interpolate(r => r * -1)}
                      />
                    ))}
                  </svg>
                </animated.div>
                <div className="interactiveItems">
                  <svg viewBox="0 0 860 860">
                    <g transform="scale(2)">
                      <PullToSpin
                        className="pullToSpin"
                        onClickSpin={this.onClickSpin}
                        role="button"
                      />
                    </g>
                  </svg>
                  <AnimatedWheelList
                    wheelType={this.props.wheelType}
                    listContent={this.props.wheelData}
                    textClippingRadius="60"
                    onChange={this.onChange}
                    selected={currentIndex}
                  />
                </div>
              </div>
            );
          }}
        </Spring>
      </div>
    );
  }
}

export default Wheel;
