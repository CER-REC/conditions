import React from 'react';
import { Spring } from 'react-spring';
import PropTypes from 'prop-types';
import './styles.scss';

import Ring from './Ring';
import WheelRayLegend from './WheelRayLegend';

class CompanyWheel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldRotation: 0,
      newRotation: 0,
      newRayRotation: 0,
    };
  }

  componentWillMount() {
    const degreesAvailForPlotting = 340;
    const numOfLegendItems = this.props.ringType === 'company' ?
      this.props.itemsData.length
      : this.getLocationItemsCount();
    const degreesPerItem = degreesAvailForPlotting / numOfLegendItems;
    this.setState({ degreesPerItem });
  }

  onSpinClick = () => {
    const newRotation = this.state.newRayRotation + Math.floor(Math.random() * 360);
    const newRayRotation = this.calcRayRotation(newRotation);
    this.setState(
      { oldRotation: this.state.newRotation },
      this.setState({ newRotation, newRayRotation }),
    );
  };

  getLocationItemsCount = () => {
    let count = 0;
    for (let i = 0; i < this.props.itemsData.length; i += 1) {
      count += this.props.itemsData[i].count;
    }
    return count + 2;
  }

  calcRayRotation = newWheelRotation => (450 - (newWheelRotation % 360)) % 360;

  render() {
    return (
      <div className="WheelContainer">
        <Spring
          config={{ tension: 50, clamp: true, mass: 0.7 }}
          from={{ transformOrigin: '50% 50.31%', transform: `rotate(${this.state.oldRotation}deg)` }}
          to={{ transform: `rotate(${this.state.newRotation}deg)`, rotate: this.state.newRayRotation }}
        >
          { props => (
            <div style={props} className="MovingContainer">
              <svg viewBox="0 0 860 860">
                <g data-name="Group 3" transform="translate(-27.5 -122.8)">
                  {/* following three lines can be deleted once everything is rendered.
                    It is an accurate representation of spacing */}
                  <g className="OuterLimitCircle OutterCircles" transform="translate(27.5 125.5)">
                    <circle cx="430" cy="430" r="426" />
                  </g>
                  <g data-name="wheelGroup" transform="translate(86 102)">
                    {/* following three lines can be deleted once everything is rendered.
                    It is an accurate representation of spacing */}
                    <g className="OutterCircles RayCircle" transform="translate(107.5 189.5)">
                      <circle className="cls-1" cx="264" cy="264" r="263.5" />
                    </g>
                    <Ring ringType={this.props.ringType} />
                    <Spring native to={{ rotation: (props.rotate) }}>
                      {legendProps => (<WheelRayLegend
                        rotation={legendProps.rotation.getValue()}
                        ringType={this.props.ringType}
                        legendPositionArray={this.props.itemsData}
                        degreesPerItem={this.state.degreesPerItem}
                      />)}
                    </Spring>
                  </g>
                </g>
              </svg>
            </div>
          )
          }
        </Spring>
        <button className="pullToSpin" onClick={this.onSpinClick} >Spin that wheel</button>
      </div>
    );
  }
}

CompanyWheel.propTypes = {
  ringType: PropTypes.string,
  itemsData: PropTypes.arrayOf(PropTypes.object),
};

CompanyWheel.defaultProps = {
  ringType: 'company',
  itemsData: [{}],
};

export default CompanyWheel;
