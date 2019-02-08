import { fromJS } from 'immutable';

export const Types = {
  SELECTED_TAB: 'selectedTab',
};

export const setTab = content => ({
  type: Types.SELECTED_TAB,
  payload: { content },
});

const initialState = fromJS({
  selectedTab: 'filter', // one of filter or search
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SELECTED_TAB:
      return state.set('selectedTab', action.payload.content);
    default: return state;
  }
};
