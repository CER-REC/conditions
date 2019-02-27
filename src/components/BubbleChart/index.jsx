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
    this.state = { indicator: '' };
    this.isDragging = false;
    this.svgRef = React.createRef();
  }

  getData = () => d3HierarchyCalculation(this.props.data, 850, 400)
    .filter(node => node.depth > 1);

  setIndicatorState = indicator => this.setState({ indicator });

  onClick = (circle) => {
    this.isDragging = false;
    this.setIndicatorState(circle.data.name || '');
  };

  onKeyPress = (event) => {
    const sortedData = this.getData();
    let itemIndex = sortedData.findIndex(v => v.data.name === this.state.indicator);
    // TODO: This currently goes through big circles then small circles, but
    // should have the big ones interposed between their children
    if (event.key === 'ArrowRight' || event.keyCode === 39) {
      itemIndex = (sortedData[itemIndex + 1]) ? (itemIndex + 1) : 0;
    } else if (event.key === 'ArrowLeft' || event.keyCode === 37) {
      itemIndex = (sortedData[itemIndex - 1]) ? (itemIndex - 1) : (sortedData.length - 1);
    }
    const newIndicator = sortedData[itemIndex].data.name;
    if (newIndicator !== this.state.indicator) { this.setIndicatorState(newIndicator); }
  };

  onDragStart = () => { this.isDragging = true; }

  onDragStop = () => { this.isDragging = false; }

  onDragOver = (e) => {
    if (!this.isDragging) { return; }
    let checked = 0;
    let { target } = e;
    while (checked < 3 && !target.dataset.name) {
      checked += 1;
      target = target.parentElement;
    }
    if (!target.dataset.name) { return; }
    this.setIndicatorState(target.dataset.name);
  }

  render() {
    const { selectedCategory } = this.props;
    if (selectedCategory !== 'instrument') {
      return null;
    }

    const data = this.getData();
    const { indicator: indicatorName } = this.state;
    const indicatorTarget = indicatorName && data.find(v => v.data.name === indicatorName);

    let indicator = null;
    if (indicatorTarget) {
      const value = indicatorTarget.depth > 2 ? indicatorTarget.value : indicatorTarget.r;
      indicator = (
        <ChartIndicator
          x={indicatorTarget.x}
          yBottom={indicatorTarget.y - value}
          radius={value}
          label={indicatorTarget.value}
          yTop={25}
        />
      );
    }

    return (
      <div className="BubbleChart">
        <svg width={850} height={400}>
          {indicator}
          {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
          <g
            ref={this.svgRef}
            onMouseDown={this.onDragStart}
            onMouseOver={this.onDragOver}
            onMouseUp={this.onDragStop}
          >
            <InstrumentBubble
              width={850}
              height={400}
              onClick={this.onClick}
              keyPress={this.onKeyPress}
              d3Calculation={data}
            />
          </g>
        </svg>
      </div>
    );
  }
}

export default BubbleChart;
