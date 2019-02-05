export const Types = {
  FEATURE: 'selectedFeature',
};

export const Feature = selectedFeature => ({
  type: Types.FEATURE,
  payload: { selectedFeature },
});

const initialState = '';
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.FEATURE: return action.payload.selectedFeature;
    default: return state;
  }
};
