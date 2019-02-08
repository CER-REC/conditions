import { fromJS } from 'immutable';

export const Types = {
  SELECTED_FEATURE: 'selectedFeature',
  MODE: 'mode',
};

export const selectedFeature = feature => ({
  type: Types.SELECTED_FEATURE,
  payload: { feature },
});

export const setMode = mode => ({
  type: Types.MODE,
  payload: { mode },
});

const initialState = fromJS({
  selectedFeature: 'Theme',
  mode: 'company',
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SELECTED_FEATURE:
      return state.set('selectedFeature', action.payload.feature);
    case Types.MODE:
      return state.set('mode', action.payload.mode);
    default: return state;
  }
};
