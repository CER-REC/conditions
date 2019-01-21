import React from 'react';
import PropTypes from 'prop-types';
import InstrumentBubble from './InstrumentBubble/index';
import ChartIndicator from '../ChartIndicator';
import d3HierarchyCalculation from '../../utilities/d3HierarchyCalculation';

const sortCombinedData = (combinedNodes) => {
  const position = combinedNodes.filter(
    node => (node.depth > 1),
  ).map(({ x, y, value: r }) => ({ x, y, r }));
  const sortedData = position.sort((a, b) => (a.x - b.x));
  return sortedData;
};

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
      label: '',
    };
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

  // Interaction Functions for Chart Indicator
  onClick = (circleProp) => {
    const {
      r,
      x,
      y,
      value,
      name,
    } = circleProp;
    const circleValue = circleProp.value;
    const drawnRadius = (r !== value && name === 'instrument') ? value : r;
    this.setState({
      indicatorX: x,
      indicatorYBottom: y - drawnRadius,
      indicatorRadius: drawnRadius,
      display: true,
      label: circleValue,
    });
  };

  onKeyPress = (event) => {
    const sortedData = this.combineData();
    const itemIndex = (sortedData.findIndex((item) => {
      if (item.x === this.state.indicatorX
        && item.r === this.state.indicatorRadius
        && item.y
        === this.state.indicatorYBottom + this.state.indicatorRadius) {
        return item;
      }
      return null;
    }));

    if (event.key === 'ArrowRight') {
      const rightIndex = (sortedData[itemIndex + 1]) ? (itemIndex + 1) : (0);
      this.setState({
        indicatorX: sortedData[rightIndex].x,
        indicatorYBottom:
        sortedData[rightIndex].y - sortedData[rightIndex].r,
        indicatorRadius:
        sortedData[rightIndex].r,
        label: sortedData[rightIndex].r,
      });
    } else if (event.key === 'ArrowLeft') {
      const leftIndex = (sortedData[itemIndex - 1]) ? (itemIndex - 1) : (sortedData.length - 1);
      this.setState({
        indicatorX: sortedData[leftIndex].x,
        indicatorYBottom:
        sortedData[leftIndex].y - sortedData[leftIndex].r,
        indicatorRadius: sortedData[leftIndex].r,
        label: sortedData[leftIndex].r,
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
    if (!this.state.isDragging) { return null; }

    const sortedData = this.combineData();
    const minimumArray = sortedData.map(item => Math.abs(item.x
          - (event.clientX - this.svgRef.current.getClientRects()[0].x)));
    const closestIndex = minimumArray.indexOf(
      Math.min(...minimumArray),
    );
    this.setState({
      indicatorX: sortedData[closestIndex].x,
      indicatorYBottom:
        sortedData[closestIndex].y - sortedData[closestIndex].r,
      indicatorRadius: sortedData[closestIndex].r,
      label: sortedData[closestIndex].r,
    });
    return null;
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
          { (this.state.display)
            ? (
              <ChartIndicator
                x={this.state.indicatorX}
                yBottom={this.state.indicatorYBottom}
                yTop={25}
                radius={this.state.indicatorRadius}
                label={this.state.label}
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
