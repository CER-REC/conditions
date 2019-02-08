export const Types = {
  EXPANDED_GUIDE: 'expandedGuide',
};

export const expandedGuide = () => ({
  type: Types.EXPANDED_GUIDE,
  payload: { },
});

export const reducer = (state = false, action) => {
  switch (action.type) {
    case Types.EXPANDED_GUIDE: return !state;
    default:
      return state;
  }
};
