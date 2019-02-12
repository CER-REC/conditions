import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

class WheelRay extends React.Component {
  shouldComponentUpdate(nextProps) {
    // const oldIndex = Math.abs(Math.round((this.props.rotation % 360) / this.props.degreesPerItem)
    //   % this.props.items.length);
    // const newIndex = Math.abs(Math.round((nextProps.rotation % 360) / nextProps.degreesPerItem))
    //   % nextProps.items.length;
    // console.log(`oldIndex: ${oldIndex}`, `newIndex: ${newIndex}`);
    // return oldIndex !== newIndex;
    const oldIndex = this.props.currentIndex;
    const newIndex = nextProps.currentIndex;
    console.log(`oldIndex: ${oldIndex}`, `newIndex: ${newIndex}`);
    return oldIndex !== newIndex;
  }

  render() {
    const { props } = this;
    const { items, degreesPerItem, reservedDegrees } = props;
    const height = '163px';
    const width = `${props.degreesPerItem + 1}px`;
    const halfReservedDegrees = reservedDegrees / 2;
    // const selectedIndex = Math.round((props.rotation % 360) / degreesPerItem)
    //   % items.length; // Make sure we never exceed the number of items
    const selectedIndex = props.currentIndex;
    const rays = items.map((item, index) => {
      let fill = (index === selectedIndex) ? 'blue' : 'red';

      let position = -props.rotation + 90;
      const plotIndex = selectedIndex - index;
      if (plotIndex < 0) {
        position += (plotIndex * props.degreesPerItem) - halfReservedDegrees;
        fill = 'pink';
      } else if (plotIndex > 0) {
        position += halfReservedDegrees + (plotIndex * props.degreesPerItem);
        fill = 'green';
      }


      return (
        <rect
          fill={fill}
          y="-181"
          height={(item._id === '5433ce88-f40d-4e90-84f9-980849a26910' ? '323px' : height)}
          width={width}
          key={item._id}
          transform={`translate(371 209) rotate(${position}, 0, 245)`}
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
