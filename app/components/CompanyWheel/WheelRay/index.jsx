import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

class WheelRay extends React.Component {
  shouldComponentUpdate(nextProps) {
    const oldIndex = Math.round((this.props.rotation % 360) / this.props.degreesPerItem)
      % this.props.items.length;
    const newIndex = Math.round((nextProps.rotation % 360) / nextProps.degreesPerItem)
      % nextProps.items.length;
    return oldIndex !== newIndex;
  }

  render() {
    const { props } = this;
    const { items, degreesPerItem, reservedDegrees } = props;
    const height = '163px';
    const width = `${props.degreesPerItem + 1}px`;
    const halfReservedDegrees = reservedDegrees / 2;
    const selectedIndex = Math.round((props.rotation % 360) / degreesPerItem)
      % items.length; // Make sure we never exceed the number of items

    const rays = items.map((item, index) => {
      const fill = (index === selectedIndex) ? 'blue' : 'red';

      let position = (90 - halfReservedDegrees) + (index * props.degreesPerItem);
      if (index >= selectedIndex) {
        position += (index === selectedIndex) ? halfReservedDegrees : reservedDegrees;
      }

      return (
        <rect
          fill={fill}
          y="-181"
          height={(item._id === '5433ce88-f40d-4e90-84f9-980849a26910' ? '323px' : height)}
          width={width}
          key={item._id}
          transform={`translate(371 209) rotate(${position % 360}, 0, 245)`}
        />
      );
    });

    return <React.Fragment>{rays}</React.Fragment>;
  }
}

WheelRay.propTypes = {
  degreesPerItem: PropTypes.number.isRequired,
  reservedDegrees: PropTypes.number.isRequired,
  rotation: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default WheelRay;
