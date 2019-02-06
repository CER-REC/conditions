import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import ChartIndicator from '.';
import ReadMe from './README.md';

const options = {
  range: true,
  min: 0,
  max: 300,
  step: 25,
};

const topOptions = {
  range: true,
  min: 0,
  max: 100,
  step: 10,
};

const bottomOptions = {
  range: true,
  min: 100,
  max: 300,
  step: 10,
};

const radiusOptions = {
  range: true,
  min: 20,
  max: 100,
  step: 10,
};

storiesForComponent('Components|ChartIndicator', module, ReadMe)
  .addDecorator(withKnobs)
  .add('withCircle', () => (
    <svg width={300} height={300} style={{ border: '1px solid #000' }}>
      <ChartIndicator
        label="With Circle"
        x={number('x position(px)', 50, options)}
        yTop={number('y start position(px)', 30, topOptions)}
        yBottom={number('y end position(px)', 120, bottomOptions)}
        radius={number('radius(px)', 40, radiusOptions)}
      />
    </svg>
  ))
  .add('withoutCircle', () => (
    <svg width={300} height={300} style={{ border: '1px solid #000' }}>
      <ChartIndicator
        label="Without circle"
        x={number('x position(px)', 50, options)}
        yTop={number('y start position(px)', 30, topOptions)}
        yBottom={number('y end position(px)', 120, bottomOptions)}
      />
    </svg>
  ));
