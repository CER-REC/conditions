import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import List from '../List';
import LegendItem from './LegendItem';
import './styles.scss';
import { allConditionsPerYearType, displayOrder as displayOrderType } from '../../proptypes';
import getFeatureColor from '../../utilities/getFeatureColor';
import getStreamGraphData from '../../utilities/getStreamGraphData';

export default class SmallMultiplesLegend extends React.PureComponent {
  static propTypes = {
    /** The selected feature in the feature menu */
    feature: PropTypes.string.isRequired,
    /** The data to render the stream graphs
        Items are rendered in the provided order */
    allConditionsPerYear: allConditionsPerYearType.isRequired,
    /** The name of the data element to set as selected */
    selected: PropTypes.string.isRequired,
    /** The name of the data element to highlight */
    highlightName: PropTypes.string,
    /** A function that will receive an name when a data item is selected
        or null if the all legend filter is selected */
    onChange: PropTypes.func.isRequired,
    /** Additional className to add to the component */
    className: PropTypes.string,
    displayOrder: displayOrderType.isRequired,
  };

  static defaultProps = {
    highlightName: null,
    className: '',
  };

  onItemChange = index => this.props.onChange(index === 0
    ? ''
    : this.props.displayOrder[this.props.feature][index - 1]);

  render() {
    const { feature, highlightName, selected, displayOrder } = this.props;
    const data = getStreamGraphData(
      this.props.allConditionsPerYear,
      feature,
    );

    // Add one to account for 'all
    const selectedIndex = displayOrder[feature].findIndex(v => v === selected) + 1;
    const hasHighlight = !!displayOrder[feature].find(v => v === highlightName);

    const maxCount = Math.max(...Object.values(data).flat().map(v => v.y));

    const legendDataItems = displayOrder[feature].map((subfeature, idx) => (
      <LegendItem
        key={subfeature}
        feature={feature}
        subFeature={subfeature}
        index={idx}
        color={getFeatureColor(feature, subfeature, idx)}
        data={data[subfeature]}
        max={maxCount}
        faded={hasHighlight && (subfeature !== highlightName)}
      />
    ));

    legendDataItems.unshift((
      <LegendItem
        all
        // "all" cannot be an name in data
        key="all"
        subFeature={feature}
        feature={feature}
        color=""
        max={0}
        faded={hasHighlight}
      />
    ));

    return (
      <div className={classNames('SmallMultiplesLegend', this.props.className)}>
        <List
          className={classNames({ faded: hasHighlight })}
          items={legendDataItems}
          selected={selectedIndex}
          onChange={this.onItemChange}
          guideLine
        />
      </div>
    );
  }
}
