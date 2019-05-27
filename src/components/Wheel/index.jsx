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
      needsSpin: false,
    };
  }

  static getDerivedStateFromProps(props, prevState) {
    const items = props.wheelData;
    const degreesPerItem = ((360 - reservedDegrees) / (items.length));
    const selectedIndex = items.findIndex(v => v.id === props.selectedRay);
    const { needsSpin } = prevState;
    let { newRotation } = prevState || selectedIndex * (360 / items.length);
    if (needsSpin) {
      const minimumRotation = 360 - (prevState.newRotation % 360);
      newRotation += minimumRotation + selectedIndex * (360 / items.length);
    } else {
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
      needsSpin,
    };
  }

  shouldComponentUpdate(nextProps) {
    return this.props.selectedRay !== nextProps.selectedRay
    || this.props.wheelData !== nextProps.wheelData;
  }

  componentDidUpdate() {
    if (this.state.selectedIndex === -1 && this.props.wheelData.length > 0) {
      this.onClickSpin();
    }
  }

  onClickSpin = () => {
    const items = this.props.wheelData;
    const randomNum = Math.floor(Math.random() * items.length);
    this.props.selectRay(items[randomNum].id);
    this.setState({ needsSpin: true });
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
      { newRotation: prevState.newRotation + (index * (360 / this.props.wheelData.length)) }
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
          immediate={!this.state.needsSpin}
          config={{ tension: 30, friction: 20, easing: t => t * t * t * t * t }}
          onStart={() => this.setState({ needsSpin: false })}
          from={{
            rotation: -this.state.oldRotation,
          }}
          to={{
            rotation: -this.state.newRotation,
          }}
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
