import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import FeaturesLegend from '.';
import ReadMe from './README.md';

const legendItems = [
  { color: 'pink', description: 'security', disabled: true },
  { color: 'red', description: 'managementSystem', disabled: false },
  { color: 'green', description: 'financial', disabled: false },
  { color: 'blue', description: 'damagePrevention', disabled: false },
  { color: 'purple', description: 'socioEconomic', disabled: false },
];

storiesForComponent('Components|FeaturesLegend', module, ReadMe)
  .add('Project Legend', () => (
    <FeaturesLegend
      legendItems={legendItems}
      selectedFeature="theme"
      isProjectLegend
    />
  ))
  .add('Location Legend', () => (
    <FeaturesLegend
      legendItems={legendItems}
      selectedFeature="theme"
      isProjectLegend={false}
    />
  ));
