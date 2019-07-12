import shallowequal from 'shallowequal';

export const Types = {
  SELECTED_FEATURE: 'selectedFeature',
  SELECTED_SUBFEATURE: 'selectedSubFeature',
  SELECTED_INDICATOR: 'selectedIndicator',
  SET_MULTIPLE: 'SELECTED.SET_MULTIPLE',
};

export const setSelectedFeature = feature => ({
  type: Types.SELECTED_FEATURE,
  payload: { feature },
});

export const setSelectedSubFeature = subFeature => ({
  type: Types.SELECTED_SUBFEATURE,
  payload: { subFeature },
});

export const setSelectedIndicator = indicator => ({
  type: Types.SELECTED_INDICATOR,
  payload: { indicator },
});

export const setSelectedMultiple = payload => ({
  type: Types.SET_MULTIPLE,
  payload,
});

const initialState = {
  feature: 'theme',
  subFeature: '',
  company: 0,
  region: 0,
  project: 0,
  instrument: 0,
  condition: 0,
  indicator: '',
  keywordId: -1,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SELECTED_FEATURE: return { ...state, subFeature: '', feature: action.payload.feature };
    case Types.SELECTED_SUBFEATURE: return { ...state, subFeature: action.payload.subFeature };
    case Types.SELECTED_INDICATOR: return { ...state, indicator: action.payload.indicator };
    case Types.SET_MULTIPLE: {
      const newState = { ...state, ...action.payload };
      // Only change the state if a value actually changed
      return shallowequal(state, newState) ? state : newState;
    }
    default: return state;
  }
};
