import React from 'react';
import PropTypes from 'prop-types';
import InstrumentBubble from './InstrumentBubble/index';
import ChartIndicator from '../ChartIndicator';
import d3HierarchyCalculation from './d3HierarchyCalculation';

const sortCombinedData = combinedNodes => combinedNodes
  .filter(node => (node.depth > 0))
  .map(({
    x, y, r, value, depth,
  }) => ({
    x, y, r, value, depth,
  }))
  .sort((a, b) => (a.x - b.x));

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
      indicator: null,
    };
    this.isDragging = false;
    this.svgRef = React.createRef();
  }

  combineData = () => {
    const nodes1 = d3HierarchyCalculation(
      this.props.instrumentChartData1, 550, 400,
    );
    const nodes2 = d3HierarchyCalculation(
      this.props.instrumentChartData2, 1400, 400,
    );
    const sortedData1 = sortCombinedData(nodes1);
    let sortedData2;
    if (nodes2 !== undefined) {
      sortedData2 = sortCombinedData(nodes2);
    }
    return sortedData1.concat(sortedData2);
  };

  setIndicatorState = (index) => {
    this.setState({
      display: true,
      indicator: index,
    });
  };

  onClick = (circle) => {
    this.isDragging = false;
    const sortedData = this.combineData();
    const index = (sortedData.findIndex((item) => {
      if (item.x === circle.x && item.y === circle.y && item.r === circle.r) {
        return item;
      }
      return null;
    }));
    return this.setIndicatorState(index);
  };

  onKeyPress = (event) => {
    const sortedData = this.combineData();
    const itemIndex = this.state.indicator;
    if (event.key === 'ArrowRight' || event.keyCode === 39) {
      const rightIndex = (sortedData[itemIndex + 1])
        ? (itemIndex + 1)
        : (0);
      this.setIndicatorState(rightIndex);
    } else if (event.key === 'ArrowLeft' || event.keyCode === 37) {
      const leftIndex = (sortedData[itemIndex - 1])
        ? (itemIndex - 1)
        : (sortedData.length - 1);
      this.setIndicatorState(leftIndex);
    }
  };

  onDragStart = () => {
    this.isDragging = true;
  }

  onDragMove = (event) => {
    if (!this.isDragging) { return null; }
    const sortedData = this.combineData();
    const svg = !this.svgRef.current ? { x: 156.3583, y: 187 }
      : this.svgRef.current.getClientRects()[0];
    const subtractedX = event.clientX - svg.x;
    const subtractedY = (event.clientY - svg.y);
    const minimumArray = sortedData.map(
      item => Math.sqrt(
        ((item.x - subtractedX) ** 2) + ((item.y - subtractedY) ** 2),
      ),
    );
    const closestIndex = minimumArray.indexOf(
      Math.min(...minimumArray),
    );

    this.setIndicatorState(closestIndex);
    return null;
  }

  onDragStop = () => {
    this.isDragging = false;
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

    const { indicator } = this.state;
    let indicatorProps = {};
    if (indicator !== null) {
      const sortedData = this.combineData();
      const value = sortedData[indicator].depth > 1
        ? sortedData[indicator].value
        : sortedData[indicator].r;
      indicatorProps = {
        x: sortedData[indicator].x,
        yBottom: sortedData[indicator].y - value,
        radius: value,
        label: sortedData[indicator].value,
      };
    }

    return (
      <div className="BubbleChart">
        <svg width={850} height={400}>
          { (this.state.display)
            ? (
              <ChartIndicator
                {...indicatorProps}
                yTop={25}
              />
            ) : null
          }
          <g
            ref={this.svgRef}
            onMouseDown={this.onDragStart}
            onMouseMove={this.onDragMove}
            onMouseUp={this.onDragStop}
          >
            <InstrumentBubble
              width={550}
              height={400}
              onClick={this.onClick}
              keyPress={this.onKeyPress}
              d3Calculation={d3HierarchyCalculation(
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
              d3Calculation={d3HierarchyCalculation(
                instrumentChartData2,
                1400,
                400,
              )}
            />
          </g>
        </svg>
      </div>
    );
  }
}

export default BubbleChart;
