export const Types = {
  BROWSE_BY: 'browseBy',
};

export const browseBy = mode => ({
  type: Types.BROWSE_BY,
  payload: { mode },
});

const initialState = 'company';

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.BROWSE_BY: return { browseBy: action.payload.mode };
    default: return state;
  }
};
