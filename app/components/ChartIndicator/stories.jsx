import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import ChartIndicator from '.';
import ReadMe from './README.md';

const options = {
  range: true,
  min: -300,
  max: 300,
  step: 100,
};

const heightOptions = {
  range: true,
  min: 20,
  max: 200,
  step: 20,
};
storiesForComponent('Components|ConditionsCounter', module, ReadMe)
  .addDecorator(withKnobs)
  .add('withCircle', () => (
    <ChartIndicator x={number('x position(px)', 50, options)} yTop={number('y start position(px)', 20, heightOptions)} yBottom={number('y end position(px)', 40, heightOptions)} radius={number('radius(px)', 40, heightOptions)} />
  ))
  .add('withoutCircle', () => (
    <ChartIndicator x={number('x position(px)', 50, options)} yTop={number('y start position(px)', 20, heightOptions)} yBottom={number('y end position(px)', 40, heightOptions)} />
  ));
