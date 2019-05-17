import React from 'react';
import PropTypes from 'prop-types';
import {
  VictoryAxis,
  VictoryArea,
  VictoryChart,
  VictoryGroup,
} from 'victory';
import { injectIntl, FormattedMessage, intlShape } from 'react-intl';
import StackGroupProps from './StackGroupProps';
import { features } from '../../constants';
import { allConditionsPerYear, featureTypes } from '../../proptypes';

import './styles.scss';

const noop = () => {};

const streamAnimation = { duration: 1000, easing: 'cubicInOut' };

class StreamGraph extends React.Component {
  static propTypes = {
    countsData: allConditionsPerYear.isRequired,
    feature: featureTypes.isRequired,
    subFeature: PropTypes.string.isRequired,
    streamOnly: PropTypes.bool,
    intl: intlShape.isRequired,

  }

  static defaultProps = {
    streamOnly: false,
  };

  constructor(props) {
    super(props);
    this.state = { controlYear: null };
  }

  handleOnChange = controlYear => this.setState({ controlYear });

  // For data that doesn't match the current feature/subfeature, sets all y = 0
  processCountsData = () => {
    const { countsData, feature, subFeature } = this.props;
    this.processedData = countsData.map((entry) => {
      if (entry.feature === feature
        && (entry.subFeature === subFeature || subFeature === '')
      ) { return entry; }

      const copy = JSON.parse(JSON.stringify(entry));
      Object.keys(copy.years).forEach((k) => {
        copy.years[k] = 0;
      });
      return copy;
    });
  };

  streamLayers = () => this.processedData.map(v => (
    <VictoryArea
      key={`${v.feature}-${v.subFeature}`}
      name={v.subFeature}
      data={Object.entries(v.years).map(([x, y]) => ({ x: parseInt(x, 10), y }))}
      style={{
        data: {
          fill: ((v.feature === 'instrument')
            ? features.instrument[v.rank]
            : features[v.feature][v.subFeature]
          ),
          strokeWidth: 0,
        },
      }}
      interpolation="catmullRom"
    />
  ));

  chart() {
    const filteredData = (this.props.subFeature !== '')
      ? this.processedData.filter(data => data.subFeature === this.props.subFeature)
      : this.processedData;

    // TODO: GraphQL will provide an array of [2010, 2011, 2012...]
    // We can map over that instead to save a bit of time here
    const { conditionsByDate, minConditionCount } = filteredData.reduce((acc, cur) => {
      Object.entries(cur.years).forEach(([year, count]) => {
        acc.conditionsByDate[year] = count + (acc.conditionsByDate[year] || 0);

        if (count < acc.minConditionCount) { acc.minConditionCount = count; }
      });

      return acc;
    }, { conditionsByDate: {}, minConditionCount: Infinity });

    // TODO: Use GraphQL's data to get the min + max date
    // eslint-disable-next-line prefer-const
    let { minDate, maxDate, maxConditionTotal } = Object.entries(conditionsByDate)
      .reduce((acc, [year, count]) => {
        if (year < acc.minDate) { acc.minDate = year; }
        if (year > acc.maxDate) { acc.maxDate = year; }

        if (count > acc.maxConditionTotal) { acc.maxConditionTotal = count; }

        return acc;
      }, { minDate: Infinity, maxDate: 0, maxConditionTotal: 0 });

    minDate = parseInt(minDate, 10);
    maxDate = parseInt(maxDate, 10);

    // TODO: Year list from GraphQL
    const yearTicks = Array(maxDate - minDate + 1).fill(null).map((_, i) => minDate + i);

    if (this.props.streamOnly) {
      return (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 450 350"
          preserveAspectRatio="none"
        >
          <VictoryGroup
            standalone={false}
            padding={0}
            animate={streamAnimation}
          >
            <StackGroupProps
              groupProps={{
                onChange: noop,
                controlYear: null,
                countsData: this.processedData,
                allThemes: (this.props.feature === 'theme' && this.props.subFeature === ''),
              }}
            >
              {this.streamLayers()}
            </StackGroupProps>
          </VictoryGroup>
        </svg>
      );
    }

    // Setting these here because CSS classes aren't picked up by Victory
    const axisStyles = {
      tickLabels: {
        fontSize: '10px',
      },
      axisLabel: {
        fontSize: '12px',
      },
    };

    const { intl } = this.props;

    return (
      <VictoryChart
        animate={streamAnimation}
        width={600}
        height={330}
        domainPadding={{ y: [0, 20] }}
      >
        <VictoryAxis
          dependentAxis
          label={intl.formatMessage({ id: 'components.streamGraph.axis.yAxis' })}
          tickValues={[minConditionCount, maxConditionTotal]}
          tickFormat={Math.round}
          className="axis-label"
          style={axisStyles}
        />
        <VictoryAxis
          label={intl.formatMessage({ id: 'components.streamGraph.axis.xAxis' })}
          tickFormat={Math.round}
          scale="linear"
          className="axis-label"
          tickValues={yearTicks}
          domain={[minDate, maxDate]}
          style={axisStyles}
        />
        <StackGroupProps
          groupProps={{
            onChange: this.handleOnChange,
            controlYear: this.state.controlYear,
            countsData: filteredData,
            allThemes: (this.props.feature === 'theme' && this.props.subFeature === ''),
          }}
        >
          {this.streamLayers()}
        </StackGroupProps>
      </VictoryChart>
    );
  }

  render() {
    this.processCountsData();

    return (
      <div
        className="StreamGraph"
      >
        {this.props.streamOnly ? null : (
          <FormattedMessage
            id={`components.streamGraph.title.${this.props.feature}`}
            tagName="h1"
          />
        )}
        {this.chart()}
      </div>
    );
  }
}

export default injectIntl(StreamGraph);
