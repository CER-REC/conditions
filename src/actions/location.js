export const Types = {
  ENABLE_LOCATION: 'enableLocation',
};

export const enableLocation = () => ({
  type: Types.ENABLE_LOCATION,
  payload: { },
});

const initialState = true;
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.ENABLE_LOCATION: return false;
    default: return state;
  }
};
