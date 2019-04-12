export const Types = {
  TRANSITION_STATE: 'transitionState',
};

export const setTransitionState = transitionState => ({
  type: Types.TRANSITION_STATE,
  payload: { transitionState },
});

const initialState = 0;

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.TRANSITION_STATE: return action.payload.transitionState;
    default: return state;
  }
};
