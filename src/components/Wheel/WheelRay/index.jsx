/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

class WheelRay extends React.Component {
  static propTypes = {
    degreesPerItem: PropTypes.number.isRequired,
    reservedDegrees: PropTypes.number.isRequired,
    rotation: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentIndex: PropTypes.number.isRequired,
    legendPositionArray: PropTypes.arrayOf(PropTypes.shape({
      classifier: PropTypes.string,
      count: PropTypes.number,
    })).isRequired,
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
    const height = '163px';
    const width = `${degreesPerItem + 1}px`;
    const halfReservedDegrees = reservedDegrees / 2;
    const selectedIndex = currentIndex >= 0
      ? currentIndex : items.length + currentIndex;

    const rays = items.map((item, index) => {
      const fill = (index === selectedIndex) ? 'blue' : 'red';
      let position = rotation + 90;
      const plotIndex = selectedIndex - index;
      if (plotIndex < 0) {
        position -= (plotIndex * degreesPerItem) - halfReservedDegrees;
      } else if (plotIndex > 0) {
        position -= halfReservedDegrees + (plotIndex * degreesPerItem);
      }
      // position = 180 + position;
      return (
        <g>
          {
            <text key={`1${item._id}`} className="TextLabels" transform={`translate(371 209) rotate(${position}, 0, 245)`}>
              {index}
            </text>
          }
          <rect
            fill={fill}
            y="-181"
            height={(index === 0 ? '323px' : height)}
            width={width}
            key={item._id}
            transform={`translate(371 209) rotate(${position}, 0, 245)`}
          />
        </g>
      );
    });

    return <React.Fragment>{rays}</React.Fragment>;
  }
}

WheelRay.propTypes = {

};

export default WheelRay;
