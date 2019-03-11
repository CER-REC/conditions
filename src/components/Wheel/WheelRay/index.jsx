/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import BarContainer from '../../BarContainer';
import { browseByType } from '../../../proptypes';
import { features } from '../../../constants';

import CompanyFlag from '../CompanyFlag';

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
    // legendPositionArray: PropTypes.arrayOf(PropTypes.shape({
    //   classifier: PropTypes.string,
    //   count: PropTypes.number,
    // })).isRequired,
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.currentIndex !== nextProps.currentIndex) { return true; }
    if (this.props.wheelType !== nextProps.wheelType) { return true; }
    return false;
  }

  render() {
    const { props } = this;
    // eslint-disable-next-line object-curly-newline
    const { items, degreesPerItem, reservedDegrees, rotation, currentIndex, wheelType } = props;
    const height = '163px';
    const width = `${degreesPerItem + 1}px`;
    const halfReservedDegrees = reservedDegrees / 2;
    const selectedIndex = currentIndex >= 0
      ? currentIndex : items.length + currentIndex;

    let legendTracker = '';
    const rays = items.map((item, index) => {
      if (index === selectedIndex) { return null; }
      let position = rotation + 90;
      const plotIndex = selectedIndex - index;
      if (plotIndex < 0) {
        position -= (plotIndex * degreesPerItem) - halfReservedDegrees + (degreesPerItem);
      } else if (plotIndex > 0) {
        position -= halfReservedDegrees + (plotIndex * degreesPerItem);
      }

      // TODO: work out how to remove magic numbers. Right now they came from the design

      const transform = `translate(371 209) rotate(${position.toFixed(2)}, 0, 245)`;
      // TODO: split logic below to location ray and company ray?
      const componentToReturn = wheelType === 'company'
        ? (
          <g key={item._id} transform={transform}>
            <text className="TextLabels">
              {item.company_name.charAt(0) === legendTracker ? null : item.company_name.charAt(0)}
            </text>
            {/* This rect will be used to denote the letter separation in the location wheel
            also to can be used to mark the search */}
            <CompanyFlag
              y={-170}
              flagLayout={
                [
                  ['1551111', '313', '77', '1'],
                  ['111'],
                  ['1511'],
                  ['51113711', '11', '3'],
                  ['1131'],
                  ['11'],
                  ['311'],
                ][index % 7]
              }
              width={degreesPerItem + 1}
              height={323}
              dotWidth={6}
              dotSpacing={8}
            />
            {/* <rect
              y="-181"
              fill="magenta"
              height={(index === 0) ? '323px' : height}
              width={1}
              key={item._id}
            />  */}
          </g>
        )
        // DRAW LOCATION RAY: Move this down to the location ray component
        : (
          <g key={`${item._id}`} transform={transform}>
            <g style={{ transform: 'translate(0px, -19px) rotate(-90deg)' }}>
              <BarContainer
                className="WheelBar"
                width={height /* These are backwards because of the rotation */}
                height={width}
                items={randomLocationBars[index]}
                vertical
                standalone
              />
            </g>
          </g>
        );
      legendTracker = item.company_name.charAt(0);
      return componentToReturn;
    });

    return <React.Fragment>{rays}</React.Fragment>;
  }
}

export default WheelRay;
