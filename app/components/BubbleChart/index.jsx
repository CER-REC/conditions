import React from 'react';
import PropTypes from 'prop-types';
import InstrumentBubble from './InstrumentBubble/index';
import ChartIndicator from '../ChartIndicator';
import d3HierarchyCalculation from '../../utilities/d3HierarchyCalculation';

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
      indicator: {
        x: 1,
        y: 1,
        r: 1,
        value: 1,
      },
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
    const sortedData = this.combineData();
    const drawnRadius = (sortedData[index].r
    !== sortedData[index].value
    && sortedData[index].depth > 1)
      ? sortedData[index].value
      : sortedData[index].r;

    this.setState({
      display: true,
      indicator: {
        x: sortedData[index].x,
        y: sortedData[index].y - drawnRadius,
        r: drawnRadius,
        label: sortedData[index].value,
      },
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
    const itemIndex = (sortedData.findIndex((item) => {
      if (item.x === this.state.indicator.x
        && item.y === this.state.indicator.y + this.state.indicator.r) {
        return item;
      }
      return null;
    }));
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

  onDragStart = (event) => {
    this.isDragging = true;
    this.onDragMove(event);
  }

  onDragMove = (event) => {
    if (!this.isDragging) { return null; }
    const sortedData = this.combineData();
    const svgX = !this.svgRef.current ? { x: 156.3583 }
      : this.svgRef.current.getClientRects()[0];
    const minimumArray = sortedData.map(item => Math.abs(item.x
          - (event.clientX - svgX.x)));
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

    return (
      <div className="BubbleChart">
        <svg width={850} height={400}>
          { (this.state.display)
            ? (
              <ChartIndicator
                x={this.state.indicator.x}
                yBottom={this.state.indicator.y}
                yTop={25}
                radius={this.state.indicator.r}
                label={this.state.indicator.label}
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
