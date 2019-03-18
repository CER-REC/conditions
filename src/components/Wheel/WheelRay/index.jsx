/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import { browseByType } from '../../../proptypes';
import LocationRay from '../LocationRay';

import { features } from '../../../constants';

// TODO: get legend to display in the middle of the limits of its occupancy
// TODO: get the first of each letter to draw a line

const themeKeys = Object.keys(features.theme);

const randomLocationBars = Array(200).fill('')
  .map(() => themeKeys.map(subFeature => ({
    value: Math.floor(Math.random() * 15) + 1,
    fill: features.theme[subFeature],
  })));

class WheelRay extends React.Component {
  static propTypes = {
    wheelType: browseByType.isRequired,
    degreesPerItem: PropTypes.number.isRequired,
    reservedDegrees: PropTypes.number.isRequired,
    rotation: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentIndex: PropTypes.number.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.currentIndex !== nextProps.currentIndex) { return true; }
    if (this.props.wheelType !== nextProps.wheelType) { return true; }
    return false;
  }

  render() {
    const { props } = this;
    // eslint-disable-next-line object-curly-newline
    const { items, degreesPerItem, reservedDegrees, rotation,
      currentIndex, wheelType,
    } = props;
    const width = 163;
    const halfReservedDegrees = reservedDegrees / 2;
    const selectedIndex = currentIndex >= 0
      ? currentIndex : items.length + currentIndex;

    let legendTracker = '';
    const rays = items.map((item, index) => {
      if (index === selectedIndex) { return null; }
      let position = rotation;
      const plotIndex = selectedIndex - index;
      if (plotIndex < 0) {
        position -= (plotIndex * degreesPerItem) - halfReservedDegrees + (degreesPerItem);
      } else if (plotIndex > 0) {
        position -= halfReservedDegrees + (plotIndex * degreesPerItem);
      }
      const transform = { transform: `translate(50%, 50%) rotate(${position.toFixed(2)}deg)` };

      const componentToReturn = wheelType === 'company'
        ? (
          <g key={`${item._id}CompanyRay`} style={transform} className="companyRay">
            {/* This rect will be used to denote the letter separation in the location wheel
            also to can be used to mark the search */}
            <line
              y2="50%"
              y1={(index === 0 ? '23.5%' : '31%')}
            />
            <text className="textLabels">
              { item.company_name.charAt(0) !== legendTracker ? item.company_name.charAt(0) : null }
            </text>
          </g>
        )
        : (
          <g key={`${item._id}LocationRay`} style={transform} className="locationRay">
            <LocationRay
              items={randomLocationBars[index]}
              height={degreesPerItem * 2}
              width={width}
              searched
              adjustRotationReference={degreesPerItem / 2}
            />
            { item.location.province !== legendTracker
              ? (
                <g>
                  <text className="textLabels">
                    {item.location.province}
                  </text>
                </g>
              ) : null }
          </g>
        );
      legendTracker = props.wheelType === 'company'
        ? item.company_name.charAt(0)
        : item.location.province;
      return componentToReturn;
    });

    return <g className="WheelRay">{rays}</g>;
  }
}

export default WheelRay;
