import { combineReducers } from 'redux';
import mergeDeep from 'deepmerge';

import { reducer as selectedReducer } from './actions/selected';
import { reducer as searchReducer } from './actions/search';
import { reducer as chartIndicatorPositionReducer } from './actions/chartIndicatorPosition';
import { reducer as browseByReducer } from './actions/browseBy';
import { reducer as detailViewReducer } from './actions/detailViewExpanded';
import { reducer as transitionStateReducer } from './actions/transitionState';

const nestedReducers = combineReducers({
  selected: selectedReducer,
  search: searchReducer,
  chartIndicatorPosition: chartIndicatorPositionReducer,
  browseBy: browseByReducer,
  detailViewExpanded: detailViewReducer,
  transitionState: transitionStateReducer,
});

export default (initialState = {}, action) => {
  let state = initialState;
  if (action.type === 'urlRouteChanged') {
    state = mergeDeep(state, action.payload);
  }
  return nestedReducers(state, action);
};
