import React from 'react';
import PropTypes from 'prop-types';
import InstrumentBubble from './InstrumentBubble/index';
import ChartIndicator from '../ChartIndicator';
import d3HierarchyCalculation from './d3HierarchyCalculation';
import { allConditionsByCommodityOrInstrument } from '../../proptypes';

class BubbleChart extends React.PureComponent {
  static propTypes = {
    indicator: PropTypes.string.isRequired,
    setIndicator: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    data: allConditionsByCommodityOrInstrument.isRequired,
  };

  constructor(props) {
    super(props);
    this.isDragging = false;
  }

  getData = () => {
    let propData = this.props.data;
    if (this.props.type !== '') {
      propData = this.props.data.filter(commodity => commodity.type === this.props.type);
    }
    return d3HierarchyCalculation(propData, 850, 400)
      .filter(node => node.depth > 1);
  }

  onClick = (name) => {
    this.isDragging = false;
    this.props.setIndicator(name || '');
  };

  onKeyPress = (event) => {
    const sortedData = this.getData();
    let itemIndex = sortedData.findIndex(v => v.data.name === this.props.indicator);
    // TODO: This currently goes through big circles then small circles, but
    // should have the big ones interposed between their children
    if (event.key === 'ArrowRight' || event.keyCode === 39) {
      itemIndex = (sortedData[itemIndex + 1]) ? (itemIndex + 1) : 0;
    } else if (event.key === 'ArrowLeft' || event.keyCode === 37) {
      itemIndex = (sortedData[itemIndex - 1]) ? (itemIndex - 1) : (sortedData.length - 1);
    }
    const newIndicator = sortedData[itemIndex].data.name;
    if (newIndicator !== this.props.indicator) { this.props.setIndicator(newIndicator); }
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
    this.props.setIndicator(target.dataset.name);
  }

  render() {
    const data = this.getData();
    const { indicator: indicatorName } = this.props;
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
      <svg width="100%" height="100%" viewBox="0 0 850 400" className="BubbleChart">
        {indicator}
        {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
        <g
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
    );
  }
}

export default BubbleChart;
