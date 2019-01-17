import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import ChartIndicator from '.';
import ReadMe from './README.md';

const options = {
  range: true,
  min: 0,
  max: 300,
  step: 50,
};

const heightOptions = {
  range: true,
  min: 20,
  max: 100,
  step: 20,
};
storiesForComponent('Components|ChartIndicator', module, ReadMe)
  .addDecorator(withKnobs)
  .add('withCircle', () => (
    <svg width={500} height={500}>
      <ChartIndicator x={number('x position(px)', 50, options)} yTop={number('y start position(px)', 20, heightOptions)} yBottom={number('y end position(px)', 40, heightOptions)} radius={number('radius(px)', 40, heightOptions)} />
    </svg>
  ))
  .add('withoutCircle', () => (
    <svg width={500} height={500}>
      <ChartIndicator x={number('x position(px)', 50, options)} yTop={number('y start position(px)', 20, heightOptions)} yBottom={number('y end position(px)', 40, heightOptions)} />
    </svg>
  ));