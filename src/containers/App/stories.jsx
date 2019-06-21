/* eslint-disable max-len */
import React from 'react';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import App, { AppStore } from '.';
import { setTransitionState } from '../../actions/transitionState';
import { searchResult } from '../../mockData';

const noop = () => {};
const props = {
  openIntermediatePopup: noop,
  openProjectDetails: noop,
  searchResults: searchResult.searchResults,
  filteredProjectIds: searchResult.filteredProjectIds,

};

storiesForView('Containers|App', module, ReadMe)
  .add('default', () => (
    <App {...props} />
  ))
  .add('view 2', () => {
    AppStore.dispatch(setTransitionState(8));
    return <App {...props} />;
  })
  .add('view 3', () => {
    AppStore.dispatch(setTransitionState(10));
    return <App {...props} />;
  });
