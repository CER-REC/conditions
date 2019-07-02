import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import FeaturesLegend from '.';
import ReadMe from './README.md';
import { displayOrder } from '../../mockData';

const activeEntries = [
  'SECURITY',
  'MANAGEMENT_SYSTEM',
  'FINANCIAL',
  'DAMAGE_PREVENTION',
  'SOCIO_ECONOMIC',
];

storiesForComponent('Components|FeaturesLegend', module, ReadMe)
  .add('Project Legend', () => (
    <FeaturesLegend
      activeEntries={activeEntries}
      selectedFeature="theme"
      isProjectLegend
      displayOrder={displayOrder}
    />
  ))
  .add('Location Legend', () => (
    <FeaturesLegend
      activeEntries={activeEntries}
      selectedFeature="theme"
      isProjectLegend={false}
      displayOrder={displayOrder}
    />
  ));
