import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import AppWithRedux from './AppWithRedux';

const stages = {
  'View 1': 0,
  'View 1 -> 2, step 1': 1,
  'View 1 -> 2, step 2': 2,
  'View 1 -> 2, step 3': 3,
  'View 1 -> 2, step 4': 4,
  'View 1 -> 2, step 5': 5,
  'View 1 -> 2, step 6': 6,
  'View 1 -> 2, step 7': 7,
  'View 2': 8,
  'Reset to View 1': 9,
  'View 3': 10,
};

storiesForView('Containers|App', module, ReadMe)
  .addDecorator(withKnobs)
  .add('default', () => (
    <AppWithRedux
      transitionState={select('Transition state', stages, 0)}
    />
  ));
