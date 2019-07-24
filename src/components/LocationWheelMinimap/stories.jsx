import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesForComponent, withStyles } from '../../../.storybook/utils';
import LocationWheelMinimap from '.';
import ReadMe from './README.md';

const regions = {
  'Lethbridge--Medicine Hat': { province: 'AB', name: 'Lethbridge--Medicine Hat' },
  'Northwest Territories': { province: 'NT', name: 'Northwest Territories' },
  'Prince Edward Island': { province: 'PE', name: 'Prince Edward Island' },
  'Capitale-Nationale': { province: 'QC', name: 'Capitale-Nationale' },
  'Vancouver Island and Coast': { province: 'BC', name: 'Vancouver Island and Coast' },
  'Côte-sud--Burin Peninsula': { province: 'NL', name: 'Côte-sud--Burin Peninsula' },
};

const defaultValue = regions['Lethbridge--Medicine Hat'];
storiesForComponent('Components|LocationWheelMinimap', module, ReadMe)
  .addDecorator(withKnobs)
  .addDecorator(withStyles(`
    .LocationWheelMinimap { height: 150px; }
  `))
  .add('default', () => (
    <LocationWheelMinimap
      region={select('Region', regions, defaultValue)}
    />
  ));
