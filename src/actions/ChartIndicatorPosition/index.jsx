export const Types = {
  BUBBLE: 'bubble',
  STREAM: 'stream',
};

export const bubble = position => ({
  type: Types.BUBBLE,
  payload: { position },
});

export const stream = position => ({
  type: Types.STREAM,
  payload: { position },
});

const initialState = {
  bubble: 'XO',
  stream: 2010,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.BUBBLE: return { ...state, bubble: action.payload.position };
    case Types.STREAM: return { ...state, stream: action.payload.position };
    default: return state;
  }
};
