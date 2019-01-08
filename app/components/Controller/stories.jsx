import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import Controller from '.';
import ReadMe from './README.md';

storiesForComponent('Components|Controller', module, ReadMe)
  .add('default', () => (
    <Controller x={80} ystart={50} yend={150} />
  ));
