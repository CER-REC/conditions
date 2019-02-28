import { combineReducers } from 'redux';

import { reducer as selectedReducer } from './actions/selected';
import { reducer as searchReducer } from './actions/search';
import { reducer as chartIndicatorPositionReducer } from './actions/chartIndicatorPosition';
import { reducer as browseByReducer } from './actions/browseBy';
import { reducer as detailViewReducer } from './actions/detailViewExpanded';

const nestedReducers = combineReducers({
  selected: selectedReducer,
  search: searchReducer,
  chartIndicatorPosition: chartIndicatorPositionReducer,
  browseBy: browseByReducer,
  detailViewExpanded: detailViewReducer,
});

export default (initialState = {}, action) => {
  const state = initialState;
  return nestedReducers(state, action);
};
