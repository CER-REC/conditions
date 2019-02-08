import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import LocationWheelMinimap from '.';
import ReadMe from './README.md';

const defaultProps = {
  province: 'Alberta',
  region: 'Lethbridge--Medicine Hat',
};

storiesForComponent('Components|LocationWheelMinimap', module, ReadMe)
  .add('default', () => (
    <LocationWheelMinimap {...defaultProps} />
  ));
