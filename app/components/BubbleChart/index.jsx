import React from 'react';
import PropTypes from 'prop-types';
import handleInteraction from '../../utilities/handleInteraction';

class BubbleChart extends React.PureComponent {
  static propTypes = {
    selectedCategory: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }

  setCircles = (data) => {
    const placedCircles = [];
    let theta = 45;
    // eslint-disable-next-line no-restricted-syntax
    data.forEach((circle, index) => {
      if (index === 0) {
        placedCircles.push({
          name: circle.name,
          radius: circle.radius,
          x: circle.radius,
          y: circle.radius,
        });
      }
      if (index === 1) {
        let placed = false;
        const tempIndex = 0;
        while (placed !== true) {
          const circ1 = placedCircles[tempIndex];
          const circ2 = circle;
          const circ2x = circ1.x + ((circ2.radius + circ1.radius) * Math.cos(theta)); // need to add circ1.x
          const circ2y = circ1.y + ((circ2.radius + circ1.radius) * Math.sin(theta)); // need to add circ1.y
          // check if it doesn't exceed the svg below
          const bottomCirclePoint = ((circ2.radius) * Math.sin(270)) + circ2y;
          if (this.props.height > bottomCirclePoint) {
            placed = true;
            placedCircles.push({
              name: circle.name,
              radius: circle.radius,
              x: circ2x,
              y: circ2y,
            });
          } else {
            theta -= 5;
          }
        }
      }
      console.log(placedCircles);
    });
    return placedCircles.map(i => <circle r={i.radius} cx={i.x} cy={i.y} />);
  }


  determineArea = () => {
    const data = this.props.energyBubbleData;
    const maxEnergyData = data.reduce((a, b) => ({ energyNum: a.energyNum + b.energyNum }));
    const maxEnergyNumber = maxEnergyData.energyNum;
    const minimumSpace =
    (this.props.height > this.props.width) ? this.props.width : this.props.height;
    const areaData = data.map(obj =>
      ({ name: obj.name, area: ((obj.energyNum / maxEnergyNumber) * minimumSpace * 0.9) }));
    return this.determineRadius(areaData);
  }
  determineRadius = (areaData) => {
    const radiusData = areaData.map(obj =>
      ({ name: obj.name, radius: Math.sqrt(obj.area / Math.PI) }));
    return this.setCircles(radiusData);
  }

  renderSvg = () => {
    // eslint-disable-next-line no-unused-expressions
    <svg width={this.props.width} height={this.props.height}>
      {(this.determineArea())}
    </svg >;
  }

  render() {
    if (this.props.selectedCategory !== 'instrument') {
      return null;
    }
    return (
      <div className="bubbleChart">
        { this.renderSvg()}
      </div>);
  }
}

export default BubbleChart;
