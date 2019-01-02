import React from 'react';
import PropTypes from 'prop-types';
import {
  VictoryAxis,
  VictoryArea,
  VictoryStack,
  VictoryChart,
} from 'victory';
import Control from './Control';

import './styles.scss';

export const roundDateLabel = t => Math.round(t);

const stopEvent = (event) => {
  event.stopPropagation();
};

export const StackGroup = props => (
  <g
    onClick={props.handleOnChange}
    onKeyDown={props.handleArrowKey}
    onMouseDown={props.onDragStart}
    onMouseMove={props.onDragMove}
    onMouseUp={props.onDragStop}
    onTouchStart={props.onDragStart}
    onTouchMove={props.onDragMove}
    onTouchEnd={props.onDragStop}
    role="button"
    tabIndex="-1"
  >
    {props.children}
    {!props.showControl ? null : (
      <Control
        positionControl={`translate(${props.positionControl}, 30)`}
        numOfConditionsLabel={props.numOfConditions}
      />
    )}
  </g>
);

StackGroup.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  handleArrowKey: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  showControl: PropTypes.bool.isRequired,
  positionControl: PropTypes.number.isRequired,
  numOfConditions: PropTypes.number.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragMove: PropTypes.func.isRequired,
  onDragStop: PropTypes.func.isRequired,
};

class StreamGraph extends React.Component {
  static propTypes = {
    projectData: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      key: PropTypes.number.isRequired,
      graphData: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
      })).isRequired,
    })).isRequired,
    chartTitle: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      showControl: false,
      positionControl: 30,
      numOfConditions: 0,
      isDragging: false,
    };
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragMove = this.onDragMove.bind(this);
    this.onDragStop = this.onDragStop.bind(this);
  }

  onDragStart = (event) => {
    if (!this.state.showControl) { return; }
    stopEvent(event);
    this.setState({
      isDragging: true,
    });

    document.addEventListener('mousemove', this.onDragMove);
    document.addEventListener('mouseup', this.onDragStop);
    document.addEventListener('touchmove', this.onDragMove);
    document.addEventListener('touchend', this.onDragStop);
  }

  onDragMove(event) {
    if (this.state.isDragging === false) { return; }
    stopEvent(event);
    this.setState({
      positionControl: event.clientX - 100,
    });
  }

  onDragStop = (event) => {
    stopEvent(event);

    document.removeEventListener('mousemove', this.onDragMove);
    document.removeEventListener('mouseup', this.onDragStop);
    document.removeEventListener('touchmove', this.onDragMove);
    document.removeEventListener('touchend', this.onDragStop);

    this.setState({
      isDragging: false,
    });
  }

  getConditionDates() {
    let conditionDates = this.props.projectData.reduce((acc, next) => {
      next.graphData.forEach((v) => {
        if (!acc[v.date]) { acc[v.date] = 0; }
        acc[v.date] += v.count;
      });
      return acc;
    }, {});
    conditionDates = Object.values(conditionDates);
    return conditionDates;
  }

  handleOnChange = (event) => {
    if (this.state.showControl === true) {
      document.addEventListener('click', this.handleOutsideClick, false);
    }

    const groupPosition = event.target.getClientRects()[0];
    const groupWidth = groupPosition.right - groupPosition.left;

    const dateCount = this.props.projectData[0].graphData.map(k => k.date).length;
    const sectionWidth = groupWidth / dateCount;

    const numOfConditionValue = this.getConditionDates();

    const clickArea = event.clientX - groupPosition.x;

    const currentSection = Math.floor(clickArea / sectionWidth);
    this.setState({
      positionControl: Math.ceil(sectionWidth / 2)
        + (Math.floor(currentSection * Math.ceil(sectionWidth))
        - (currentSection * 9)),
      numOfConditions: numOfConditionValue[currentSection],
    });

    this.setState({
      showControl: true,
    });
  };

  handleArrowKey = (event) => {
    const currPosition = this.state.positionControl;

    if ((event.key !== 'ArrowLeft' || event.keyCode !== 37) && (event.key !== 'ArrowRight' || event.keyCode !== 39)) {
      return;
    }

    let direction = -50;
    let valueIndex = -1;
    if (event.key === 'ArrowRight' || event.keyCode === 39) {
      direction = 50;
      valueIndex = 1;
    }

    if (direction + currPosition < event.target.getClientRects()[0].left - 100 ||
      direction + currPosition > event.target.getClientRects()[0].left + 300) {
      return;
    }

    const numOfConditionValue = this.getConditionDates();
    const groupPosition = event.target.getClientRects()[0];
    const groupWidth = groupPosition.right - groupPosition.left;

    const dateCount = this.props.projectData[0].graphData.map(k => k.date).length;
    const sectionWidth = groupWidth / dateCount;

    const currentSection = Math.floor(currPosition / sectionWidth);

    this.setState({
      positionControl: currPosition + direction,
      numOfConditions: numOfConditionValue[currentSection + valueIndex],
    });
  };

  handleOutsideClick = (e) => {
    if (!this.node.contains(e.target)) {
      this.setState({ showControl: false });
    }
  }

  streamLayers() {
    const streamLayers = this.props.projectData.map(v => (
      <VictoryArea
        key={v.key}
        name={v.name}
        data={v.graphData.map(k => ({ x: k.date, y: k.count }))}
        style={{
          data: {
            fill: v.color,
            strokeWidth: 0,
          },
        }}
        interpolation="natural"
      />
    ));
    return streamLayers;
  }

  chart() {
    const numOfConditions = this.props.projectData.map(k => k.graphData.map(v => v.count));
    const numOfConditionsConcat = [].concat(...numOfConditions);

    const minConditionValue = Math.min(...numOfConditionsConcat);

    const date = this.props.projectData.map(k => k.graphData.map(v => v.date));
    const dateConcat = [].concat(...date);

    const minDateValue = Math.min(...dateConcat);
    const maxDateValue = Math.max(...dateConcat);

    const maxConditionValue = Math.max(...this.getConditionDates());

    return (
      <VictoryChart>
        <VictoryAxis
          dependentAxis
          label="Number of Conditions"
          tickValues={[minConditionValue, maxConditionValue]}
          className="axis-label"
        />
        <VictoryAxis
          label="Effective Date"
          tickFormat={roundDateLabel}
          className="axis-label"
          domain={[minDateValue, maxDateValue]}
        />
        <VictoryStack
          groupComponent={
            <StackGroup
              handleOnChange={this.handleOnChange}
              handleArrowKey={this.handleArrowKey}
              onDragStart={this.onDragStart}
              onDragMove={this.onDragMove}
              onDragStop={this.onDragStop}
              showControl={this.state.showControl}
              positionControl={this.state.positionControl}
              numOfConditions={this.state.numOfConditions}
            />
          }
        >
          {this.streamLayers()}
        </VictoryStack>
      </VictoryChart>
    );
  }

  chartTitle() {
    return (
      <h1>{this.props.chartTitle}</h1>
    );
  }

  render() {
    return (
      <div
        className="streamgraph"
        ref={(node) => { this.node = node; }}
      >
        {this.chartTitle()}
        {this.chart()}
      </div>
    );
  }
}

export default StreamGraph;
