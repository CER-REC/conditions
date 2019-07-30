import React from 'react';
import { storiesForComponent, withStyles } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import ReadMe from './README.md';
import RegionConditions from '.';
import { aggregatedCount, displayOrder } from '../../../mockData';

storiesForComponent('Components|RegionSummary/RegionConditions', module, ReadMe)
  .addDecorator(withStatus({
    name: 'underReview',
  }))
  .addDecorator(withStyles(`
    .RegionConditions { width: 300px; height: 124px; }
  `))
  .add('with theme data', () => (
    <RegionConditions
      selectedFeature="theme"
      selectedAggregatedCount={aggregatedCount}
      displayOrder={displayOrder}
    />
  ))
  .add('with type data', () => (
    <RegionConditions
      selectedFeature="type"
      selectedAggregatedCount={aggregatedCount}
      displayOrder={displayOrder}
    />
  ))
  .add('with no data', () => (
    <RegionConditions
      selectedFeature="theme"
      displayOrder={displayOrder}
    />
  ));
