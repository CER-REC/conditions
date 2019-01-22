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

const topOptions = {
  range: true,
  min: 20,
  max: 100,
  step: 20,
};

const bottomOptions = {
  range: true,
  min: 100,
  max: 200,
  step: 20,
};

const radiusOptions = {
  range: true,
  min: 20,
  max: 100,
  step: 20,
};

storiesForComponent('Components|ChartIndicator', module, ReadMe)
  .addDecorator(withKnobs)
  .add('withCircle', () => (
    <svg width={300} height={300}>
      <ChartIndicator
        x={number('x position(px)', 50, options)}
        yTop={number('y start position(px)', 20, topOptions)}
        yBottom={number('y end position(px)', 120, bottomOptions)}
        radius={number('radius(px)', 40, radiusOptions)}
      />
    </svg>
  ))
  .add('withoutCircle', () => (
    <svg width={300} height={300}>
      <ChartIndicator
        x={number('x position(px)', 50, options)}
        yTop={number('y start position(px)', 20, topOptions)}
        yBottom={number('y end position(px)', 120, bottomOptions)}
      />
    </svg>
  ));
