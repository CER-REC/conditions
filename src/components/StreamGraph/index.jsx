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
import { allConditionsPerYearType, featureTypes } from '../../proptypes';

import './styles.scss';

const noop = () => {};

const streamAnimation = { duration: 1000, easing: 'cubicInOut' };

class StreamGraph extends React.Component {
  static propTypes = {
    countsData: allConditionsPerYearType.isRequired,
    years: PropTypes.arrayOf(PropTypes.number).isRequired,
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

  streamLayers = () => this.processedData.map((v) => {
    const data = Object.entries(v.years).map(([x, y]) => ({ x: parseInt(x, 10), y }));

    return (
      <VictoryArea
        key={`${v.feature}-${v.subFeature}`}
        name={v.subFeature}
        data={data}
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
    );
  });

  updateControlYearState = (controlYearArray) => {
    if (this.state.controlYear === null) {
      // sorting of control year array
      const controlYearArr = controlYearArray.sort();
      if (controlYearArray.length >= 3) {
        const [controlYear] = controlYearArr.slice(-3, -2);
        return parseInt(controlYear, 10);
      }
    }
    return this.state.controlYear;
  };

  chart() {
    const filteredData = this.processedData.filter(entry => (
      (entry.feature === this.props.feature)
      && ((this.props.subFeature === '') || (entry.subFeature === this.props.subFeature))
    ));

    const controlYearArray = [];

    const yearTotals = filteredData.reduce((acc, cur) => {
      Object.entries(cur.years).forEach(([year, count], yearIdx) => {
        acc[yearIdx] = count + (acc[yearIdx] || 0);
        if (!controlYearArray.includes(year)) {
          controlYearArray.push(year);
        }
      });

      return acc;
    }, []);

    const maxTotal = Math.max(...yearTotals);
    const minTotal = Math.min(...yearTotals);

    const minDate = this.props.years[0];
    const maxDate = this.props.years[this.props.years.length - 1];

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
    const controlYr = this.updateControlYearState(controlYearArray);
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
          tickValues={[minTotal, maxTotal]}
          tickFormat={Math.round}
          className="axis-label"
          style={axisStyles}
        />
        <VictoryAxis
          label={intl.formatMessage({ id: 'components.streamGraph.axis.xAxis' })}
          tickFormat={Math.round}
          scale="linear"
          className="axis-label"
          tickValues={this.props.years}
          domain={[minDate, maxDate]}
          style={axisStyles}
        />
        <StackGroupProps
          groupProps={{
            onChange: this.handleOnChange,
            controlYear: controlYr,
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
