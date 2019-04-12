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

const reservedDegrees = 14;

const AnimatedWheelRay = animated(WheelRay);

class Wheel extends React.Component {
  static propTypes = {
    wheelType: browseByType.isRequired,
    wheelData: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedRay: PropTypes.string,
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
    const items = props.wheelType === 'company'
      ? props.wheelData.sort((a, b) => (a.name < b.name ? -1 : 1))
      : props.wheelData.sort((a, b) => (a.location.province < b.location.province ? -1 : 1));
    const degreesAvailForPlotting = 360 - reservedDegrees;
    const degreesPerItem = degreesAvailForPlotting / (items.length - 1);
    let selectedIndex = items.findIndex(v => v.id === props.selectedRay);
    // eslint-disable-next-line prefer-destructuring
    selectedIndex = selectedIndex >= 0 ? selectedIndex : 0;
    // eslint-disable-next-line prefer-destructuring
    let { newRotation } = prevState || -(Math.sign(selectedIndex) * degreesPerItem);
    // console.log(`prevNewRotation: ${prevState.newRotation}`);
    const { needsSpin } = prevState;
    if (needsSpin) {
      const minimumRotation = 360 - (prevState.newRotation % 360);
      newRotation += minimumRotation + selectedIndex * degreesPerItem;
    } else {
      const diff = Math.abs(selectedIndex - prevState.selectedIndex);
      if (diff < items.length - 1) {
        const adding = (selectedIndex - prevState.selectedIndex) * degreesPerItem;
        newRotation += adding;
      } else {
        newRotation += -(Math.sign(selectedIndex - prevState.selectedIndex) * degreesPerItem);
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

  onClickSpin = () => {
    const items = this.props.wheelData;
    const randomNum = Math.floor(Math.random() * items.length);
    this.setState({ needsSpin: true });
    this.props.selectRay(items[randomNum]._id);
  };

  onChange = (index) => {
    const { length } = this.props.wheelData;
    // TODO: check on resizing of letters on wheel list according to wheel size
    const newIndex = (2 * length - index) % length;
    this.setState(({ newRotation, degreesPerItem }) => {
      const currentIndex = (length + this.getIndex(newRotation)) % length;
      const diff = Math.abs(newIndex - currentIndex);
      const isLargeDiff = diff > length / 2;
      let direction;
      if (newIndex > currentIndex && !isLargeDiff) {
        direction = 1;
      } else if (newIndex < currentIndex && isLargeDiff) {
        direction = 1;
      } else {
        direction = -1;
      }
      const indexShift = isLargeDiff
        ? Math.min(newIndex, currentIndex) + length - Math.max(newIndex, currentIndex)
        : diff;
      return {
        newRotation: newRotation + direction * indexShift * degreesPerItem,
        needsSpin: false,
      };
    });
  };

  // eslint-disable-next-line arrow-body-style
  getIndex = (currentRotation) => {
    return Math.round((currentRotation % 360) / (360 / this.props.wheelData.length));
  };

  stopWheel = (rotation) => {
    this.setState({ newRotation: rotation });
  };

  shouldRender = childComponent => (this.props.wheelData.length > 0
    ? childComponent
    : null);

  render() {
    return (
      <div className="Wheel">
        <Spring
          immediate={!this.state.needsSpin}
          config={{ tension: 30, easing: 'easeInOutCirc' }}
          onStart={() => this.setState({ needsSpin: false })}
          from={{
            transform: `rotate(${this.state.oldRotation}deg)`,
            rotation: -this.state.oldRotation,
          }}
          to={{
            transform: `rotate(${this.state.newRotation}deg)`,
            rotation: -this.state.newRotation,
          }}
        >
          {props => (
            <div className="svgContainer">
              <div style={props} className="MovingContainer">
                <svg viewBox="0 0 860 860">
                  <Ring ringType={this.props.wheelType} />
                  {this.shouldRender(<AnimatedWheelRay
                    stopWheel={this.stopWheel}
                    wheelType={this.props.wheelType}
                    items={this.props.wheelData}
                    degreesPerItem={this.state.degreesPerItem}
                    reservedDegrees={reservedDegrees}
                    currentIndex={this.getIndex(props.rotation) % this.props.wheelData.length}
                    {...props}
                  />)}
                </svg>
              </div>
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
                {this.shouldRender(<WheelList
                  wheelType={this.props.wheelType}
                  listContent={this.props.wheelData}
                  textClippingRadius="60"
                  onChange={this.onChange}
                  selected={
                    (this.props.wheelData.length + this.getIndex(props.rotation))
                    % this.props.wheelData.length
                  }
                />)
                }
              </div>
            </div>
          )}
        </Spring>
      </div>
    );
  }
}

export default Wheel;
