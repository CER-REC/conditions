import React from 'react';
import PropTypes from 'prop-types';
import InstrumentBubble from './InstrumentBubble/index';
import ChartIndicator from '../ChartIndicator';
import d3HierarchyCalculation from './d3HierarchyCalculation';

class BubbleChart extends React.PureComponent {
  static propTypes = {
    selectedCategory: PropTypes.string.isRequired,
    data: PropTypes.instanceOf(Object).isRequired,
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

  getData = () => d3HierarchyCalculation(this.props.data, 850, 400)
    .filter(node => node.depth > 1);

  getOrderedCircles = () => this.getData()
    .sort((a, b) => (a.x - b.x));

  setIndicatorState = (index) => {
    this.setState({
      display: true,
      indicator: index,
    });
  };

  onClick = (circle) => {
    this.isDragging = false;
    const sortedData = this.getOrderedCircles();
    const index = sortedData.findIndex(item => item.data.name === circle.data.name);
    return this.setIndicatorState(index);
  };

  onKeyPress = (event) => {
    const sortedData = this.getOrderedCircles();
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

  onDragStart = () => { this.isDragging = true; }

  onDragStop = () => { this.isDragging = false; }

  onDragMove = (event) => {
    if (!this.isDragging) { return; }
    const sortedData = this.getOrderedCircles();
    const svg = !this.svgRef.current ? { x: 156.3583, y: 187 }
      : this.svgRef.current.getClientRects()[0];
    const subX = event.clientX - svg.x;
    const subY = event.clientY - svg.y;
    const [index] = sortedData.reduce((acc, node, i) => {
      if (node.depth < 2) { return acc; }
      const distance = Math.sqrt(
        ((node.x - subX) ** 2) + ((node.y - subY) ** 2),
      );
      return (distance > acc[1]) ? acc : [i, distance];
    }, [null, Number.MAX_SAFE_INTEGER]);
    this.setIndicatorState(index);
  }

  render() {
    const { selectedCategory, data } = this.props;
    if (selectedCategory !== 'instrument') {
      return null;
    }

    const { indicator } = this.state;
    let indicatorProps = {};
    if (indicator !== null) {
      const sortedData = this.getOrderedCircles();
      const value = sortedData[indicator].depth > 2
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
          {this.state.display
            ? <ChartIndicator {...indicatorProps} yTop={25} />
            : null}
          <g
            ref={this.svgRef}
            onMouseDown={this.onDragStart}
            onMouseMove={this.onDragMove}
            onMouseUp={this.onDragStop}
          >
            <InstrumentBubble
              width={850}
              height={400}
              onClick={this.onClick}
              keyPress={this.onKeyPress}
              d3Calculation={this.getData()}
            />
          </g>
        </svg>
      </div>
    );
  }
}

export default BubbleChart;
