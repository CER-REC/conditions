export const Types = {
  SELECTED_FEATURE: 'selectedFeature',
};

export const selectedFeature = feature => ({
  type: Types.SELECTED_FEATURE,
  payload: { feature },
});

const initialState = {
  selectedFeature: 'theme',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SELECTED_FEATURE: return action.payload.feature;
    default: return state;
  }
};
