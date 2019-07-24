export const Types = {
  TOGGLE_DETAIL_VIEW: 'toggleDetailView',
};

export const toggleDetailView = () => ({
  type: Types.TOGGLE_DETAIL_VIEW,
  payload: {},
});

const initialState = true;

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.TOGGLE_DETAIL_VIEW: return !state;
    default: return state;
  }
};
