import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import App from '.';

const stages = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  '8 -> 0': 9,
};

storiesForView('Containers|App', module, ReadMe)
  .addDecorator(withKnobs)
  .add('default', () => (
    <App
      transitionState={select('Transition state', stages, 0)}
    />
  ));
