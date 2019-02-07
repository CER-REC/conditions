import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import LocationWheelMinimap from '.';
import ReadMe from './README.md';

storiesForComponent('Components|LocationWheelMinimap', module, ReadMe)
  .add('default', () => (
    <LocationWheelMinimap />
  ));
