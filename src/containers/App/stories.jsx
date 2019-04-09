import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import App from '.';

/**
 * TODO: Remove this when the app's scroll interactions are implemented
 * Forcing knobs to update from a component's callback
 * Source: https://github.com/storybooks/storybook/issues/3855#issuecomment-476149416
 */

// eslint-disable-next-line import/order
import { manager } from '@storybook/addon-knobs/dist/registerKnobs';

const addons = require('@storybook/addons');
// eslint-disable-next-line import/no-extraneous-dependencies
const coreEvents = require('@storybook/core-events');

const { knobStore } = manager;
const setTransitionState = (state) => {
  knobStore.store['Transition state'].value = state;
  // eslint-disable-next-line no-underscore-dangle
  manager._mayCallChannel();
  // Changing the knobs doesn't seem to transmit a prop change to the story
  addons.default.getChannel().emit(coreEvents.FORCE_RE_RENDER);
};

/**
 * End of knob hackery
 */

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
    <App
      transitionState={select('Transition state', stages, 0)}
      setTransitionState={setTransitionState}
    />
  ));
