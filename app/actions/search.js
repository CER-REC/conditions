import { fromJS } from 'immutable';

export const Types = {
  SEARCH: 'search',
};

export const Search = search => ({
  type: Types.SEARCH,
  payload: { search },
});

const initialState = '';
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SEARCH: return fromJS(action.payload.search);
    default: return state;
  }
};
