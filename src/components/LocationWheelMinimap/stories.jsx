import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import LocationWheelMinimap from '.';
import ReadMe from './README.md';

const defaultProps = {
  region: 'Lethbridge--Medicine Hat',
};

const nwtProps = {
  region: 'Northwest Territories',
};

storiesForComponent('Components|LocationWheelMinimap', module, ReadMe)
  .add('default', () => (
    <LocationWheelMinimap {...defaultProps} />
  ))
  .add('nwt', () => (
    <LocationWheelMinimap {...nwtProps} />
  ));
