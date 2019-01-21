import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import ChartIndicator from '.';
import ReadMe from './README.md';

const options = {
  range: true,
  min: 125,
  max: 250,
  step: 25,
};

const topOptions = {
  range: true,
  min: 40,
  max: 100,
  step: 20,
};

const heightOptions = {
  range: true,
  min: 40,
  max: 100,
  step: 20,
};

const bottomOptions = {
  range: true,
  min: 40,
  max: 100,
  step: 20,
};

const visible = true;
storiesForComponent('Components|ChartIndicator', module, ReadMe)
  .addDecorator(withKnobs)
  .add('withCircle', () => (
    <svg width={500} height={500}>
      <ChartIndicator
        label="With Circle"
        display={visible}
        x={number('x position(px)', 50, options)}
        yTop={number('y start position(px)', 20, topOptions)}
        yBottom={number('y end position(px)', 40, bottomOptions)}
        radius={number('radius(px)', 40, heightOptions)}
      />
    </svg>
  ))
  .add('withoutCircle', () => (
    <svg width={500} height={500}>
      <ChartIndicator
        label="Without circle"
        x={number('x position(px)', 50, options)}
        yTop={number('y start position(px)', 20, heightOptions)}
        yBottom={number('y end position(px)', 40, heightOptions)}
      />
    </svg>
  ));
