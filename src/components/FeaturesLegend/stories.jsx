import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import FeaturesLegend from '.';
import ReadMe from './README.md';
import { displayOrder, aggregatedCount } from '../../mockData';

storiesForComponent('Components|FeaturesLegend', module, ReadMe)
  .add('Project Legend', () => (
    <FeaturesLegend
      selectedAggregatedCount={aggregatedCount}
      selectedFeature="theme"
      isProjectLegend
      displayOrder={displayOrder}
    />
  ))
  .add('Location Legend', () => (
    <FeaturesLegend
      selectedAggregatedCount={aggregatedCount}
      selectedFeature="theme"
      isProjectLegend={false}
      displayOrder={displayOrder}
    />
  ));
