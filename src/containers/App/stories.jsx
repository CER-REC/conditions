import React from 'react';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import App, { AppStore } from '.';
import { setTransitionState } from '../../actions/transitionState';

storiesForView('Containers|App', module, ReadMe)
  .add('default', () => (
    <App />
  ))
  .add('view 2', () => {
    AppStore.dispatch(setTransitionState(8));
    return <App />;
  })
  .add('view 3', () => {
    AppStore.dispatch(setTransitionState(10));
    return <App />;
  });
