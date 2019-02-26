import { combineReducers } from 'redux';

import { reducer as SelectedReducer } from './actions/selected';
import { reducer as SearchReducer } from './actions/Search';
import { reducer as ChartIndicatorPositionReducer } from './actions/ChartIndicatorPosition';
import { reducer as BrowseByReducer } from './actions/BrowseBy';
import { reducer as DetailViewReducer } from './actions/DetailView';

const nestedReducers = combineReducers({
  selected: SelectedReducer,
  search: SearchReducer,
  chartIndicatorPosition: ChartIndicatorPositionReducer,
  browseBy: BrowseByReducer,
  detailView: DetailViewReducer,
});

export default (initialState = {}, action) => {
  const state = initialState;
  return nestedReducers(state, action);
};
