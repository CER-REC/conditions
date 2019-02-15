/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import BarContainer from '../../BarContainer';

class WheelRay extends React.Component {
  static propTypes = {
    wheelType: PropTypes.oneOf(['Company', 'Location']).isRequired,
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
    const oldIndex = this.props.currentIndex;
    const newIndex = nextProps.currentIndex;
    return oldIndex !== newIndex;
  }

  render() {
    const { props } = this;
    // eslint-disable-next-line object-curly-newline
    const { items, degreesPerItem, reservedDegrees, rotation, currentIndex } = props;
    // const height = '163px';
    // const width = `${degreesPerItem + 1}px`;
    const halfReservedDegrees = reservedDegrees / 2;
    const selectedIndex = currentIndex >= 0
      ? currentIndex : items.length + currentIndex;

    let legendTracker = '';
    const rays = items.map((item, index) => {
      if (index === selectedIndex) return;
      let position = rotation + 90;
      const plotIndex = selectedIndex - index;
      if (plotIndex < 0) {
        position -= (plotIndex * degreesPerItem) - halfReservedDegrees + (degreesPerItem);
      } else if (plotIndex > 0) {
        position -= halfReservedDegrees + (plotIndex * degreesPerItem);
      }
      const transform = `translate(371 209) rotate(${position}, 0, 245)`;
      const componentToReturn = (
        <g key={`${item._id}`} transform={transform}>
          <text key={`a${item._id}`} className="TextLabels">
            {item.company_name.charAt(0) === legendTracker ? null : item.company_name.charAt(0)}
          </text>
          <g>
            <g style={{ transform: 'translate(0px, -19px) rotate(-90deg)' }}>
              <BarContainer
                className="WheelBar"
                size={163 / 3} // the height divided by the length of condition items.
                title="ConditionTitle"
                desc="conditionDesc"
                items={[{ value: 8, fill: 'green' }, { value: 10, fill: 'red' }, { value: 7, fill: 'pink' }]}
                vert
                standalone
              />
            </g>
          </g>
          {/* This rect will be used to denote the letter separation in the location wheel */}
          {/* <rect
            fill="red"
            y="-181"
            height={(index === 0 ? '323px' : height)}
            width={width}
            key={item._id}
            transform={transform}
          /> */}
        </g>
      );
      legendTracker = item.company_name.charAt(0) === legendTracker
        ? legendTracker : item.company_name.charAt(0);
      // eslint-disable-next-line consistent-return
      return componentToReturn;
    });

    return <React.Fragment>{rays}</React.Fragment>;
  }
}

export default WheelRay;
