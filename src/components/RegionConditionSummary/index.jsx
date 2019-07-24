import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import BarContainer from '../BarContainer';
import './styles.scss';
import {
  displayOrder as displayOrderType,
  aggregatedFeatureData,
  featureTypes,
} from '../../proptypes';
import getKeyedAggregatedCount from '../../utilities/getKeyedAggregatedCount';
import getFeatureColor from '../../utilities/getFeatureColor';

const RegionConditionSummary = (props) => {
  const { displayOrder, selectedAggregatedCount, selectedFeature } = props;
  if (!selectedAggregatedCount) { return null; }

  const counts = getKeyedAggregatedCount(selectedAggregatedCount, selectedFeature);
  const items = displayOrder[selectedFeature].map((name, i) => ({
    value: counts[name] || 0,
    fill: getFeatureColor(selectedFeature, name, i),
    description: name,
    feature: selectedFeature,
  }));

  return (
    <div className="RegionConditionSummary">
      <div className="ChartContainer">
        <div className="RegionConditionSummaryTitle">
          <FormattedMessage id="components.regionConditionSummary.title" />
        </div>
        <div className={classNames('RegionConditionChart', props.isHidden ? 'hidden' : '')}>
          <BarContainer items={items} vertical />
        </div>
      </div>
      <div className="BorderBottom" />
      <svg className="YAxis" viewBox="0 0 100 100">
        <text x="45" y="18">100</text>
        <rect x="85" y="8" width="10" height="3" />
        <text x="58" y="100">0</text>
        <rect x="85" y="50" width="10" height="3" />
      </svg>
    </div>
  );
};

RegionConditionSummary.propTypes = {
  isHidden: PropTypes.bool,
  selectedAggregatedCount: aggregatedFeatureData,
  selectedFeature: featureTypes.isRequired,
  displayOrder: displayOrderType.isRequired,
};

RegionConditionSummary.defaultProps = {
  isHidden: false,
  selectedAggregatedCount: null,
};

export default RegionConditionSummary;
