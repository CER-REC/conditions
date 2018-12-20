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

export const StackGroup = props => (
  <g
    onClick={props.handleOnClick}
    onKeyDown={props.handleOnClick}
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
  handleOnClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  showControl: PropTypes.bool.isRequired,
  positionControl: PropTypes.number.isRequired,
  numOfConditions: PropTypes.number.isRequired,
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
    };
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
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

  handleOnClick = (event) => {
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
              handleOnClick={this.handleOnClick}
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
