import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesForComponent, withStyles } from '../../../.storybook/utils';
import LocationWheelMinimap from '.';
import ReadMe from './README.md';

const regions = [
  'Lethbridge--Medicine Hat',
  'Northwest Territories',
  'Prince Edward Island',
  'Capitale-Nationale',
  'Vancouver Island and Coast',
  'Côte-sud--Burin Peninsula',
];

storiesForComponent('Components|LocationWheelMinimap', module, ReadMe)
  .addDecorator(withKnobs)
  .addDecorator(withStyles(`
    .LocationWheelMinimap { height: 150px; }
  `))
  .add('default', () => (
    <LocationWheelMinimap
      region={select('Region', regions, 'Lethbridge--Medicine Hat')}
    />
  ));
