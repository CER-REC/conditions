export const Types = {
  EXPAND_DETAIL_VIEW: 'expandDetailView',
};

export const expandDetailView = () => ({
  type: Types.EXPAND_DETAIL_VIEW,
  payload: { },
});

const initialState = false;

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.EXPAND_DETAIL_VIEW: return !state;
    default: return state;
  }
};
