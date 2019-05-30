import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import List from '../List';
import LegendItem from './LegendItem';
import './styles.scss';
import { features } from '../../constants';
import { allConditionsPerYear } from '../../proptypes';
import getFilteredProjectData from '../../utilities/getFilteredProjectData';

class SmallMultiplesLegend extends React.PureComponent {
  static propTypes = {
    /** The selected feature in the feature menu */
    feature: PropTypes.string.isRequired,
    /** The data to render the stream graphs
        Items are rendered in the provided order */
    data: allConditionsPerYear.isRequired,
    /** The name of the data element to set as selected */
    selected: PropTypes.string.isRequired,
    /** The name of the data element to highlight */
    highlightName: PropTypes.string,
    /** A function that will receive an name when a data item is selected
        or null if the all legend filter is selected */
    onChange: PropTypes.func.isRequired,
    /** Additional className to add to the component */
    className: PropTypes.string,
  };

  static defaultProps = {
    highlightName: null,
    className: '',
  };

  getData = () => getFilteredProjectData(this.props.data, this.props.feature);

  onItemChange = index => this.props
    .onChange(index === 0 ? '' : this.getData()[index - 1].subFeature);

  render() {
    const { feature, highlightName, selected } = this.props;
    const data = this.getData();

    // Add one to account for 'all
    const selectedIndex = data.findIndex(c => c.subFeature === selected) + 1;
    const hasHighlight = !!data.find(c => c.subFeature === highlightName);

    const maxCount = data.reduce((acc, { years }) => Math.max(acc, ...Object.values(years)), 0);

    const legendDataItems = data.map((conditionsData, idx) => (
      <LegendItem
        key={conditionsData.subFeature}
        feature={this.props.feature}
        subFeature={conditionsData.subFeature}
        index={idx}
        color={(this.props.feature === 'instrument')
          ? features.instrument[idx]
          : features[this.props.feature][conditionsData.subFeature]
        }
        data={conditionsData}
        max={maxCount}
        faded={hasHighlight && (conditionsData.subFeature !== this.props.highlightName)}
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

// TODO: Wrap in React.memo when testing issue fixed
export default SmallMultiplesLegend;
