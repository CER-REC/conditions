import React from 'react';
import PropTypes from 'prop-types';
import {
  VictoryAxis,
  VictoryArea,
  VictoryChart,
} from 'victory';
import { FormattedMessage } from 'react-intl';
import StackGroupProps from './StackGroupProps';
import { features } from '../../constants';
import { allConditionsPerYear, featureTypes } from '../../proptypes';
import getFilteredProjectData from '../../utilities/getFilteredProjectData';

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

  streamLayers() {
    let filteredData = getFilteredProjectData(this.props.projectData, this.props.feature);
    if (this.props.subFeature !== '') {
      filteredData = filteredData
        .filter(featureData => featureData.subFeature === this.props.subFeature);
    }
    const streamLayers = filteredData.map(v => (
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
        interpolation="natural"
      />
    ));
    return streamLayers;
  }

  chart() {
    let filteredData = getFilteredProjectData(this.props.projectData, this.props.feature);
    if (this.props.subFeature !== '') {
      filteredData = filteredData
        .filter(featureData => featureData.subFeature === this.props.subFeature);
    }

    if (this.props.streamOnly) {
      return (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 450 350"
          preserveAspectRatio="none"
        >
          <StackGroupProps
            standalone={false}
            width="450"
            height="350"
            padding={0}
            groupProps={{
              onChange: noop,
              controlYear: '',
              projectData: filteredData,
            }}
          >
            {this.streamLayers()}
          </StackGroupProps>
        </svg>
      );
    }

    const numOfConditions = filteredData.map(k => Object.values(k.years));
    const numOfConditionsConcat = [].concat(...numOfConditions);

    const minConditionValue = Math.min(...numOfConditionsConcat);

    const dates = filteredData.map(k => Object.keys(k.years));
    const dateConcat = [].concat(...dates);

    const minDateValue = Math.min(...dateConcat);
    const maxDateValue = Math.max(...dateConcat);

    let conditionDates = filteredData.reduce((acc, next) => {
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
            projectData: filteredData,
          }}
        >
          {this.streamLayers()}
        </StackGroupProps>
      </VictoryChart>
    );
  }

  render() {
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
