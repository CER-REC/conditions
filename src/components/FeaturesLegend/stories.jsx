import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import FeaturesLegend from '.';
import ReadMe from './README.md';

const legendItems = [
  { color: 'pink', description: 'SECURITY', disabled: true },
  { color: 'red', description: 'MANAGEMENT_SYSTEM', disabled: false },
  { color: 'green', description: 'FINANCIAL', disabled: false },
  { color: 'blue', description: 'DAMAGE_PREVENTION', disabled: false },
  { color: 'purple', description: 'SOCIO_ECONOMIC', disabled: false },
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
