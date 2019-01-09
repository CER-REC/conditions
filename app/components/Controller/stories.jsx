import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import Controller from '.';
import ReadMe from './README.md';

const options = {
  range: true,
  min: -300,
  max: 300,
  step: 100,
};

const heightOptions = {
  range: true,
  min: 0,
  max: 200,
  step: 20,
};
storiesForComponent('Components|Controller', module, ReadMe)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Controller x={number('x position(px)', 50, options)} ystart={number('y start position(px)', 20, heightOptions)} yend={number('y end position(px)', 40, heightOptions)} />
  ));
