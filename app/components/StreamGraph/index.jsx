import React from 'react';
import PropTypes from 'prop-types';
import {
  VictoryAxis,
  VictoryArea,
  VictoryStack,
  VictoryChart,
} from 'victory';
import StackGroup from './StackGroup';

import './styles.scss';

export const roundDateLabel = t => Math.round(t);

const VictoryStackReplacement = ({ groupProps, ...props }) => (
  <VictoryStack
    groupComponent={<StackGroup {...groupProps} stackProps={props} />}
    {...props}
  />
);

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
      controlYear: null,
    };
  }

  handleOnChange = controlYear => this.setState({ controlYear });

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

    let conditionDates = this.props.projectData.reduce((acc, next) => {
      next.graphData.forEach((v) => {
        if (!acc[v.date]) { acc[v.date] = 0; }
        acc[v.date] += v.count;
      });
      return acc;
    }, {});
    conditionDates = Object.values(conditionDates);

    const maxConditionValue = Math.max(...conditionDates);

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
          className="Axis-label"
          domain={[minDateValue, maxDateValue]}
        />
        <VictoryStackReplacement
          groupProps={{
            onChange: this.handleOnChange,
            controlYear: this.state.controlYear,
            projectData: this.props.projectData,
          }}
        >
          {this.streamLayers()}
        </VictoryStackReplacement>
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
        className="Streamgraph"
      >
        {this.chartTitle()}
        {this.chart()}
      </div>
    );
  }
}

export default StreamGraph;
