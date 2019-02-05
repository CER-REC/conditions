import Immutable from 'immutable';

export const Types = {
  VIEW_ONE_SETTINGS: 'viewOneSettings',
};

export const viewOneSettings = (page, open, x, y, search) => ({
  type: Types.VIEW_ONE_SETTINGS,
  payload: {
    page,
    open,
    x,
    y,
    search,
  },
});

const defaults = Immutable.fromJS({
  page: 0,
  open: true,
  x: 0,
  y: 0,
  search: '',
});

export const reducer = (state = defaults, action) => {
  switch (action.type) {
    case Types.VIEW_ONE_SETTINGS:
      return state.merge(action.payload);
    default:
      return state;
  }
};
