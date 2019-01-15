import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import InstrumentBubble from './InstrumentBubble/index';
import ChartIndicator from '../ChartIndicator';

class BubbleChart extends React.PureComponent {
  static propTypes = {
    selectedCategory: PropTypes.string.isRequired,
    instrumentChartData1: PropTypes.instanceOf(Object).isRequired,
    instrumentChartData2: PropTypes.instanceOf(Object).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      display: false,
      indicatorX: 1,
      indicatorYBottom: 1,
      indicatorRadius: 0,
    };
  }

  d3HierarchyCalculation = (instrumentChartData, width, height) => {
    // d3 pack generates a function to
    // fit data into tightly packed circles.
    const pack = d3
      .pack()
      .size([width, height])
      .padding(node => (node.depth === 0 ? 0 : 5))
      .radius((node) => {
        // Calculation for rendering larger circle based on text length
        const characterWidth = 8;
        const textLength = node.data.name.length * characterWidth;
        const textHeight = 15;
        const textLengthExceeds = node.value * 2 <= textLength;
        if (textLengthExceeds) {
          return node.value + textLength; // buffer
        }
        if (node.value < textHeight) {
          return node.value + textHeight;
        }
        return node.value;
      });
    // creates the root node using
    // d3 hierarchy similar to a tree layout
    const root = d3
      .hierarchy(instrumentChartData)
      .sum(totalData => totalData.value)
      .sort((a, b) => b.value - a.value);

    const descendants = pack(root).descendants();
    return descendants;
  };

  combineData = () => {
    const nodes1 = this.d3HierarchyCalculation(this.props.instrumentChartData1, 550, 400);
    const nodes2 = this.d3HierarchyCalculation(this.props.instrumentChartData2, 1400, 400);
    const sortedData1 = this.sortCombinedData(nodes1);
    let sortedData2 = [];
    if (nodes2 !== undefined) {
      sortedData2 = this.sortCombinedData(nodes2);
    }
    return sortedData1.concat(sortedData2);
  };

  sortCombinedData = (combinedNodes) => {
    const position = combinedNodes.filter(node => (node.depth > 1)).map(node => ({
      x: node.x,
      y: node.y,
      r: node.value,
    }));
    const sortedData = position.sort((a, b) => {
      if (a.x < b.x) {
        return -1;
      }
      if (a.x > b.x) {
        return 1;
      }
      return 0;
    });
    return sortedData;
  }

  // Interaction Functions for Chart Indicator
  onClick = (circleProp) => {
    const circleRadius = circleProp[0];
    const circleX = circleProp[1];
    const circleY = circleProp[2];
    this.setState({
      indicatorX: circleX,
      indicatorYBottom: circleY - circleRadius,
      indicatorRadius: circleRadius,
      display: true,
    });
  };

  onKeyPress = (event) => {
    const sortedData = this.combineData();
    const itemIndex = (sortedData.findIndex((item) => {
      if (item.x === this.state.indicatorX
        && item.r === this.state.indicatorRadius
        && item.y === this.state.indicatorYBottom + this.state.indicatorRadius) {
        return item;
      }
      return null;
    }));

    if (event.key === 'ArrowRight') {
      this.setState({
        indicatorX: sortedData[itemIndex + 1].x,
        indicatorYBottom: sortedData[itemIndex + 1].y - sortedData[itemIndex + 1].r,
        indicatorRadius: sortedData[itemIndex + 1].r,
      });
    } else if (event.key === 'ArrowLeft') {
      this.setState({
        indicatorX: sortedData[itemIndex - 1].x,
        indicatorYBottom: sortedData[itemIndex - 1].y - sortedData[itemIndex - 1].r,
        indicatorRadius: sortedData[itemIndex - 1].r,
      });
    }
  };

  onDragStart = (event) => {
    this.setState({
      isDragging: true,
    });
    this.onDragMove(event);
  }

  onDragMove = (event) => {
    if (this.state.isDragging === true) {
      const sortedData = this.combineData();
      const minimumArray = sortedData.map(item => Math.abs(item.x - (event.clientX - 64)));
      const closestIndex = minimumArray.indexOf(Math.min.apply(null, minimumArray));
      this.setState({
        indicatorX: sortedData[closestIndex].x,
        indicatorYBottom: sortedData[closestIndex].y - sortedData[closestIndex].r,
        indicatorRadius: sortedData[closestIndex].r,
      });
    }
  }

  onDragStop = () => {
    this.setState({
      isDragging: false,
    });
  }

  render() {
    const {
      selectedCategory,
      instrumentChartData1,
      instrumentChartData2,
    } = this.props;
    if (selectedCategory !== 'instrument') {
      return null;
    }

    return (
      <div className="BubbleChart">
        <svg width={850} height={400}>
          <ChartIndicator
            x={this.state.indicatorX}
            yBottom={this.state.indicatorYBottom}
            yTop={0}
            radius={this.state.indicatorRadius}
            display={this.state.display}
            onDragMove={this.onDragMove}
            onDragStart={this.onDragStart}
            onDragStop={this.onDragStop}
          />
          <InstrumentBubble
            width={550}
            height={400}
            onClick={this.onClick}
            keyPress={this.onKeyPress}
            d3HierarchyCalculation={this.d3HierarchyCalculation(
              instrumentChartData1,
              550,
              400,
            )}
          />
          <InstrumentBubble
            width={1400}
            height={400}
            onClick={this.onClick}
            keyPress={this.onKeyPress}
            d3HierarchyCalculation={this.d3HierarchyCalculation(
              instrumentChartData2,
              1400,
              400,
            )}
          />
        </svg>
      </div>
    );
  }
}

export default BubbleChart;
