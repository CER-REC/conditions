import { combineReducers } from 'redux';

import { reducer as SelectedFeatureReducer } from './actions/SelectedFeature';

const nestedReducers = combineReducers({
  selectedFeature: SelectedFeatureReducer,
});

export default (initialState = {}, action) => {
  const state = initialState;
  return nestedReducers(state, action);
};
