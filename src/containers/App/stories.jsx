import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import App from '.';

storiesForView('Containers|App', module, ReadMe)
  .addDecorator(withKnobs)
  .add('default', () => (
    <App
      transitionState={select('Transition state', [0, 1, 2, 3, 4, 5, 6, 7, 8], 0)}
    />
  ));
