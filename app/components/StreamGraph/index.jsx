import React from 'react';
import PropTypes from 'prop-types';
import { VictoryAxis, VictoryArea, VictoryStack, VictoryChart } from 'victory';

import './styles.scss';

export const numOfConditionsLabel = point => `${Math.round(point.y)}`;

export const roundDateLabel = t => Math.round(t);
class StreamGraph extends React.PureComponent {
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
  }

  control() {
    const { x, y } = this.props;
    return (
      <div className="streamgraph-control">
        <svg width="100%" height="100%" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <text x="15" y="15">conditions</text>
          <line
            strokeDasharray="10, 5"
            x1="20"
            x2="20"
            y1="20"
            y2="130"
            stroke="magenta"
            strokeWidth="2"
            transform="scale(2)"
          />
          <path
            d="M 100 100 L 300 100 L 200 300 z"
            fill="magenta"
            transform="scale(0.2)"
          />
        </svg>
      </div>
    );
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

  render() {
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
      <div className="streamgraph">
        {this.control()}
        <h1>Themes Across All Conditions</h1>
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
          <VictoryStack>
            {this.streamLayers()}
          </VictoryStack>
        </VictoryChart>
      </div>
    );
  }
}

export default StreamGraph;
