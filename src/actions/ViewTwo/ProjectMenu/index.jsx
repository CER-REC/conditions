import { fromJS } from 'immutable';
// import SELECTED_FEATURE from ViewTwo

export const Types = {
  POSITION: 'position',
};

export const setPosition = position => ({
  type: Types.POSITION,
  payload: { position },
});

const initialState = fromJS({
  selectedFeature: 'Theme',
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
