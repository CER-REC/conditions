import React from 'react';
import PropTypes from 'prop-types';
import {
  VictoryAxis,
  VictoryArea,
  VictoryChart,
} from 'victory';
import StackGroupProps from './StackGroupProps';
import { features } from '../../constants';
import { allConditionsPerYear } from '../../proptypes';

import './styles.scss';

export const roundDateLabel = t => Math.round(t);

class StreamGraph extends React.Component {
  static propTypes = {
    projectData: allConditionsPerYear.isRequired,
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
        key={`${v.feature}-${v.subfeature}`}
        name={v.subfeature}
        data={Object.entries(v.years).map(([x, y]) => ({ x: parseInt(x, 10), y }))}
        style={{
          data: {
            fill: features[v.feature][v.subfeature],
            strokeWidth: 0,
          },
        }}
        interpolation="natural"
      />
    ));
    return streamLayers;
  }

  chart() {
    const numOfConditions = this.props.projectData.map(k => Object.values(k.years));
    const numOfConditionsConcat = [].concat(...numOfConditions);

    const minConditionValue = Math.min(...numOfConditionsConcat);

    const dates = this.props.projectData.map(k => Object.keys(k.years));
    const dateConcat = [].concat(...dates);

    const minDateValue = Math.min(...dateConcat);
    const maxDateValue = Math.max(...dateConcat);

    let conditionDates = this.props.projectData.reduce((acc, next) => {
      Object.entries(next.years).forEach(([date, count]) => {
        if (!acc[date]) { acc[date] = 0; }
        acc[date] += count;
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
        <StackGroupProps
          groupProps={{
            onChange: this.handleOnChange,
            controlYear: this.state.controlYear,
            projectData: this.props.projectData,
          }}
        >
          {this.streamLayers()}
        </StackGroupProps>
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
