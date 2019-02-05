import { fromJS } from 'immutable';

export const Types = {
  INSTRUMENT_CONDITION: 'instrumentCondition',
};

export const InstrumentCondition = instrumentCondition => ({
  type: Types.INSTRUMENT_CONDITION,
  payload: { instrumentCondition },
});

const initialState = '';
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SEARCH: return fromJS(action.payload.instrumentCondition);
    default: return state;
  }
};
