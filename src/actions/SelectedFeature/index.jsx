export const Types = {
  SELECTED_FEATURE: 'selectedFeature',
};

export const selectedFeature = feature => ({
  type: Types.SELECTED_FEATURE,
  payload: { feature },
});

const initialState = {
  feature: 'theme',
  subfeature: '',
  companty: '',
  project: '',
  condition: '',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SELECTED_FEATURE: return { ...state, selectedFeature: action.payload.feature };
    // case Types.SELECTED_FEATURE: return { ...state, selectedFeature: action.payload.feature };
    // case Types.SELECTED_FEATURE: return { ...state, selectedFeature: action.payload.feature };
    // case Types.SELECTED_FEATURE: return { ...state, selectedFeature: action.payload.feature };
    // case Types.SELECTED_FEATURE: return { ...state, selectedFeature: action.payload.feature };
    default: return state;
  }
};
