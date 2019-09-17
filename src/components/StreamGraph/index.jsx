import React from 'react';
import PropTypes from 'prop-types';
import {
  VictoryAxis,
  VictoryArea,
  VictoryChart,
  VictoryGroup,
} from 'victory';
import { injectIntl, FormattedMessage, intlShape } from 'react-intl';
import memoize from 'lodash.memoize';
import StackGroupProps from './StackGroupProps';
import {
  allConditionsPerYearType,
  featureTypes,
  displayOrder as displayOrderType,
} from '../../proptypes';
import getFeatureColor from '../../utilities/getFeatureColor';
import getStreamGraphData from '../../utilities/getStreamGraphData';
import { lang, features } from '../../constants';

import './styles.scss';

const noop = () => {};

const streamAnimation = { duration: 1000, easing: 'cubicInOut' };

class StreamGraph extends React.PureComponent {
  static propTypes = {
    allConditionsPerYear: allConditionsPerYearType.isRequired,
    feature: featureTypes.isRequired,
    subFeature: PropTypes.string.isRequired,
    streamOnly: PropTypes.bool,
    intl: intlShape.isRequired,
    displayOrder: displayOrderType.isRequired,
  }

  static defaultProps = {
    streamOnly: false,
  };

  constructor(props) {
    super(props);
    this.state = { controlYear: null };
  }

  getYearTicksInternal = memoize(
    (min, max) => Array(max - min + 1).fill(min).map((v, i) => v + i),
  );

  getYearTicks = () => this.getYearTicksInternal(
    this.props.allConditionsPerYear.minYear,
    this.props.allConditionsPerYear.maxYear,
  );

  getStreamData = () => getStreamGraphData(
    this.props.allConditionsPerYear,
    this.props.feature,
  );

  formatTickValues = v => Math.round(v).toLocaleString(lang);

  handleOnChange = controlYear => this.setState({ controlYear });

  streamLayers = () => {
    const { subFeature } = this.props;
    const data = this.getStreamData();
    const emptyYears = this.getYearTicks().map(x => ({ x, y: 0 }));
    return Object.keys(features)
      .map(feature => this.props.displayOrder[feature].map((name, i) => {
        let areaData = emptyYears;
        if (feature === this.props.feature && (!subFeature || name === subFeature)) {
          areaData = data[name];
        }
        return (
          <VictoryArea
            key={`${feature}-${name}`}
            name={name}
            data={areaData}
            style={{
              data: {
                fill: getFeatureColor(this.props.feature, name, i),
                strokeWidth: 0,
              },
            }}
            interpolation="catmullRom"
          />
        );
      }))
      .flat()
      .reverse();
  }

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
    const { allConditionsPerYear, intl } = this.props;
    const controlYearArray = this.getYearTicks();

    const filteredData = this.props.subFeature
      ? this.getStreamData()[this.props.subFeature]
      : Object.values(this.getStreamData()).flat();
    const years = filteredData
      .reduce((acc, { x, y }) => ({ ...acc, [x]: (acc[x] || 0) + y }), {});
    const maxTotal = Math.max(...Object.values(years));

    const { minYear, maxYear } = allConditionsPerYear;

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
                totalPerYear: years,
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
        fontFamily: 'FiraSansCondensedLight, sans-serif',
        fill: 'rgb(77, 77, 77)',
      },
      axisLabel: {
        fontSize: '13px',
        fontFamily: 'FiraSansCondensed, sans-serif',
        fontWeight: '700',
        fill: 'rgb(161,168,167)',
      },
    };

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
          tickValues={[0, maxTotal]}
          tickFormat={this.formatTickValues}
          className="axis-label"
          style={axisStyles}
        />
        <VictoryAxis
          label={intl.formatMessage({ id: 'components.streamGraph.axis.xAxis' })}
          tickFormat={Math.round}
          scale="linear"
          className="axis-label"
          tickValues={this.getYearTicks()}
          domain={[minYear, maxYear]}
          style={axisStyles}
        />
        <StackGroupProps
          groupProps={{
            onChange: this.handleOnChange,
            controlYear: controlYr,
            totalPerYear: years,
            allThemes: (this.props.feature === 'theme' && this.props.subFeature === ''),
          }}
        >
          {this.streamLayers()}
        </StackGroupProps>
      </VictoryChart>
    );
  }

  render() {
    return (
      <div className="StreamGraph">
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
