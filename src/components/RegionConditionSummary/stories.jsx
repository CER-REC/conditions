import React from 'react';
import { storiesForComponent, withStyles } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import ReadMe from './README.md';
import RegionConditionSummary from '.';
import { aggregatedCount, displayOrder } from '../../mockData';

storiesForComponent('Components|RegionConditionSummary', module, ReadMe)
  .addDecorator(withStatus({
    name: 'underReview',
  }))
  .addDecorator(withStyles(`
    .RegionConditionSummary { width: 300px; height: 124px; }
  `))
  .add('with theme data', () => (
    <RegionConditionSummary
      selectedFeature="theme"
      selectedAggregatedCount={aggregatedCount}
      displayOrder={displayOrder}
    />
  ))
  .add('with type data', () => (
    <RegionConditionSummary
      selectedFeature="type"
      selectedAggregatedCount={aggregatedCount}
      displayOrder={displayOrder}
    />
  ))
  .add('with no data', () => (
    <RegionConditionSummary
      selectedFeature="theme"
      displayOrder={displayOrder}
    />
  ));
