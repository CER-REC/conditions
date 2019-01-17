import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import ProjectLegend from '.';
import ReadMe from './README.md';

const legendItems = [
  { color: 'pink', description: 'security', disabled: true },
  { color: 'red', description: 'managementSystem', disabled: false },
  { color: 'green', description: 'financial', disabled: false },
  { color: 'blue', description: 'damagePrevention', disabled: false },
  { color: 'purple', description: 'socioEconomic', disabled: false },
];

storiesForComponent('Components|ProjectLegend', module, ReadMe)
  .add('default', () => (
    <ProjectLegend legendItems={legendItems} selectedFeature="theme" />
  ));
