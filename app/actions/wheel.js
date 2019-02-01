import { fromJS } from 'immutable';

export const Types = {
  SET_LOCATION: 'setLocation',
  SEARCH_FIELD: 'searchField',
  FEATURE_FILTER: 'featureFilter',
  SELECTED_ID: 'selectedId',
  YEAR_FILTER: 'yearFilter',
  STATUS_FILTER: 'statusFilter',
};

export const setLocation = mode => ({
  type: Types.SET_LOCATION,
  payload: { mode },
});

export const searchField = search => ({
  type: Types.SEARCH_FIELD,
  payload: { search },
});

export const featureFilter = feature => ({
  type: Types.FEATURE_FILTER,
  payload: { feature },
});

export const selectedId = id => ({
  type: Types.SELECTED_ID,
  payload: { id },
});

export const yearFilter = yearRange => ({
  type: Types.YEAR_FILTER,
  payload: { yearRange },
});

export const statusFilter = status => ({
  type: Types.STATUS_FILTER,
  payload: { status },
});

const initialState = fromJS({
  mode: 'company',
  search: '',
  feature: 'importsExports',
  id: '',
  yearRange: [],
  status: [],
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_LOCATION:
      return state.set('setLocation', action.payload.mode);
    case Types.SEARCH_FIELD:
      return state.set('searchField', action.payload.search);
    case Types.FEATURE_FILTER:
      return state.set('featureFilter', action.payload.feature);
    case Types.SELECTED_ID:
      return state.set('selectedId', action.payload.id);
    case Types.YEAR_FILTER:
      return state.set('yearFilter', action.payload.year);
    case Types.STATUS_FILTER:
      return state.set('statusFilter', action.payload.status);
    default: return state;
  }
};

