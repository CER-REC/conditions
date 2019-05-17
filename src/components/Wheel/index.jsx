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
    const degreesAvailForPlotting = 360 - reservedDegrees;
    const degreesPerItem = degreesAvailForPlotting / (items.length - 1);
    const selectedIndex = items.findIndex(v => v.id === props.selectedRay);
    const { needsSpin } = prevState;
    let { newRotation } = prevState || selectedIndex * degreesPerItem;
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

  shouldComponentUpdate(nextProps) {
    return this.props.selectedRay !== nextProps.selectedRay
    || this.props.wheelData.length !== nextProps.wheelData.length;
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
    const index = Math.round((currentRotation % 360) / ((360 - reservedDegrees) / (length - 1)));
    return index;
  };

  stopWheel = (index) => {
    this.setState(prevState => (
      { newRotation: prevState.newRotation + (index * prevState.degreesPerItem) }
    ));
  };

  shouldRender = componentRenderFn => (
    this.props.wheelData.length > 0 ? componentRenderFn() : null)
  ;

  render() {
    return (
      <div className="Wheel">
        <Spring
          immediate={!this.state.needsSpin}
          config={{ tension: 30, easing: 'easeInExpo' }}
          onStart={() => this.setState({ needsSpin: false })}
          onRest={() => null /* set loading status to false for the projectMenu */}
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
                  {this.shouldRender(() => (
                    <AnimatedWheelRay
                      onChange={this.onChange}
                      stopWheel={this.stopWheel}
                      wheelType={this.props.wheelType}
                      items={this.props.wheelData}
                      degreesPerItem={this.state.degreesPerItem}
                      reservedDegrees={reservedDegrees}
                      currentIndex={(this.props.wheelData.length - this.getIndex(props.rotation))
                        % this.props.wheelData.length}
                      {...props}
                    />
                  ))}
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
                <WheelList
                  wheelType={this.props.wheelType}
                  listContent={this.props.wheelData}
                  textClippingRadius="60"
                  onChange={this.onChange}
                  selected={
                    (this.props.wheelData.length - this.getIndex(props.rotation))
                    % this.props.wheelData.length
                  }
                />
              </div>
            </div>
          )}
        </Spring>
      </div>
    );
  }
}

export default Wheel;
