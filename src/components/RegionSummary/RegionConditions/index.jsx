import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import BarContainer from '../../BarContainer';
import './styles.scss';
import {
  displayOrder as displayOrderType,
  aggregatedFeatureData,
  featureTypes,
} from '../../../proptypes';
import getKeyedAggregatedCount from '../../../utilities/getKeyedAggregatedCount';
import getFeatureColor from '../../../utilities/getFeatureColor';

const RegionConditions = (props) => {
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
    <div className="RegionConditions">
      <div className="ChartContainer">
        <div className="RegionConditionsTitle">
          <FormattedMessage id="components.regionSummary.regionConditions.title" />
        </div>
        <div className={classNames('RegionConditionChart', props.isHidden ? 'hidden' : '')}>
          <BarContainer items={items} vertical />
        </div>
      </div>
      <svg className="YAxis" viewBox="0 0 100 100">
        <text x="76" y="15" textAnchor="end">100</text>
        <rect x="85" y="15" width="10" height="3" />
        <text x="76" y="100" textAnchor="end">0</text>
        <rect x="85" y="57.5" width="10" height="3" />
      </svg>
    </div>
  );
};

RegionConditions.propTypes = {
  isHidden: PropTypes.bool,
  selectedAggregatedCount: aggregatedFeatureData,
  selectedFeature: featureTypes.isRequired,
  displayOrder: displayOrderType.isRequired,
};

RegionConditions.defaultProps = {
  isHidden: false,
  selectedAggregatedCount: null,
};

export default RegionConditions;
