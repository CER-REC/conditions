import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import FeaturesLegend from '.';
import ReadMe from './README.md';

const legendItems = [
  { description: 'SECURITY', disabled: true },
  { description: 'MANAGEMENT_SYSTEM', disabled: false },
  { description: 'FINANCIAL', disabled: false },
  { description: 'DAMAGE_PREVENTION', disabled: false },
  { description: 'SOCIO_ECONOMIC', disabled: false },
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
