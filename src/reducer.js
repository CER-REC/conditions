import { combineReducers } from 'redux';
import { Iterable } from 'immutable';

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

const mergeDeep = (old, merge) => {
  if (old === Object(old) && Array.isArray(old) === false) {
    if (Iterable.isIterable(old)) { return old.mergeDeep(merge); }
    const newVal = { ...old };
    Object.keys(merge).forEach((key) => {
      newVal[key] = mergeDeep(old[key], merge[key]);
    });
    return newVal;
  }
  // This cannot be merged. Return the new value
  return merge;
};

export default (initialState = {}, action) => {
  let state = initialState;
  if (action.type === 'urlRouteChanged') {
    state = mergeDeep(state, action.payload);
  }
  return nestedReducers(state, action);
};
