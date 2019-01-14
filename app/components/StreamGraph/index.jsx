import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import {
  VictoryAxis,
  VictoryArea,
  VictoryStack,
  VictoryChart,
} from 'victory';

import './styles.scss';

export const numOfConditionsLabel = point => `${Math.round(point.y)}`;

export const roundDateLabel = t => Math.round(t);
class StreamGraph extends React.PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
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
    return (
      <div
        className="streamgraph-control"
        style={{
          position: 'absolute',
          zIndex: 9,
          marginTop: '-485px',
          marginLeft: '300px',
          height: '100%',
        }}
      >
        <svg height="400px">
          <g transform="translate(30, 30)">
            <text x="15" y="15">{this.numOfConditionsLabel}</text>
            <line
              strokeDasharray="10, 5"
              x1="20"
              x2="20"
              y1="20"
              y2="330"
              stroke="magenta"
              strokeWidth="2"
              transform="scale(2)"
            />
            <path
              d="M 100 100 L 300 100 L 200 300 z"
              fill="magenta"
              transform="scale(0.2)"
            />
          </g>
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
          label={this.props.intl.formatMessage({ id: 'components.streamGraph.yAxis' })}
          tickValues={[minConditionValue, maxConditionValue]}
          className="axis-label"
        />
        <VictoryAxis
          label={this.props.intl.formatMessage({ id: 'components.streamGraph.xAxis' })}
          tickFormat={roundDateLabel}
          className="axis-label"
          domain={[minDateValue, maxDateValue]}
        />
        <VictoryStack>
          {this.streamLayers()}
        </VictoryStack>
      </VictoryChart>
    );
  }

  render() {
    return (
      <div className="streamgraph">
        <FormattedMessage id="components.streamGraph.title">
          {text => <h1>{text}</h1>}
        </FormattedMessage>
        {this.chart()}
        {this.control()}
      </div>
    );
  }
}

export default injectIntl(StreamGraph);
