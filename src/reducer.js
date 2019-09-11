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
    /*
      Arrays need to be replaced rather than merged, or things like the initial filter status:
        ['IN PROGRESS', 'COMPLETED']
      will be concatenated with the same items in a pasted URL and produce:
        ['IN PROGRESS', 'COMPLETED', 'IN PROGRESS', 'COMPLETED']
    */
    state = mergeDeep(state, action.payload, { arrayMerge: (dest, source) => source });
  }
  return nestedReducers(state, action);
};
