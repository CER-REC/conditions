export const Types = {
  BROWSE_BY: 'browseBy',
};

export const setBrowseBy = browseBy => ({
  type: Types.BROWSE_BY,
  payload: { browseBy },
});

const initialState = 'company';

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.BROWSE_BY: return action.payload.browseBy;
    default: return state;
  }
};
