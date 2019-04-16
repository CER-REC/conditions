import React from 'react';
import PropTypes from 'prop-types';
import {
  VictoryAxis,
  VictoryArea,
  VictoryChart,
  VictoryGroup,
} from 'victory';
// import { linear } from 'd3-scale';
import { FormattedMessage } from 'react-intl';
import StackGroupProps from './StackGroupProps';
import { features } from '../../constants';
import { allConditionsPerYear, featureTypes } from '../../proptypes';
// import getFilteredProjectData from '../../utilities/getFilteredProjectData';

import './styles.scss';

export const roundDateLabel = t => Math.round(t);
const noop = () => {};

class StreamGraph extends React.Component {
  static propTypes = {
    projectData: allConditionsPerYear.isRequired,
    feature: featureTypes.isRequired,
    subFeature: PropTypes.string.isRequired,
    streamOnly: PropTypes.bool,
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
  processProjectData = () => {
    const { projectData, feature, subFeature } = this.props;
    this.processedData = projectData.map((project) => {
      if (project.feature === feature && (project.subFeature === subFeature || subFeature === '')) { return project; }

      const copy = JSON.parse(JSON.stringify(project));
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
          fill: features[v.feature][v.subFeature],
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

    const { conditionsByDate, minConditionCount } = filteredData.reduce((acc, cur) => {
      Object.entries(cur.years).forEach(([year, count]) => {
        acc.conditionsByDate[year] = count + (acc.conditionsByDate[year] || 0);
        if (count < acc.minConditionCount) { acc.minConditionCount = count; }
      });
      return acc;
    }, { conditionsByDate: {}, minConditionCount: Infinity });

    const { minDate, maxDate, maxConditionTotal } = Object.entries(conditionsByDate)
      .reduce((acc, [year, count]) => {
        if (year < acc.minDate) { acc.minDate = year; }
        if (year > acc.maxDate) { acc.maxDate = year; }
        if (count > acc.maxConditionTotal) { acc.maxConditionTotal = count; }
        return acc;
      }, { minDate: Infinity, maxDate: 0, maxConditionTotal: 0 });

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
          >
            <StackGroupProps
              groupProps={{
                onChange: noop,
                controlYear: null,
                projectData: filteredData,
                allThemes: (this.props.feature === 'theme' && this.props.subFeature === ''),
              }}
            >
              {this.streamLayers()}
            </StackGroupProps>
          </VictoryGroup>
        </svg>
      );
    }

    // Setting these here because CSS classes weren't being picked up by Victory
    // I may have just been doing it wrong though
    const axisStyles = {
      tickLabels: {
        fontSize: '10px',
      },
      axisLabel: {
        fontSize: '12px',
      },
    };

    return (
      <VictoryChart
        animate={{
          onExit: {
            duration: 500,
            before: () => ({ _y: 0 }),
          },
        }}
      >
        <VictoryAxis
          dependentAxis
          label="Number of Conditions"
          tickValues={[minConditionCount, maxConditionTotal]}
          className="axis-label"
          style={axisStyles}
        />
        <VictoryAxis
          label="Effective Date"
          tickFormat={roundDateLabel}
          className="axis-label"
          domain={[minDate, maxDate]}
          style={axisStyles}
        />
        <StackGroupProps
          groupProps={{
            onChange: this.handleOnChange,
            controlYear: this.state.controlYear,
            projectData: filteredData,
            allThemes: (this.props.feature === 'theme' && this.props.subFeature === ''),
          }}
        >
          {this.streamLayers()}
        </StackGroupProps>
      </VictoryChart>
    );
  }

  render() {
    this.processProjectData();

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

export default StreamGraph;
