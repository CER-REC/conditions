import Immutable from 'immutable';

export const Types = {
  VIEW_TWO_SETTINGS: 'viewTwoSettings',
};

export const viewTwoSettings = (selectedFeature, location, search) => ({
  type: Types.VIEW_TWO_SETTINGS,
  payload: {
    selectedFeature,
    location,
    search,
  },
});

const defaults = Immutable.fromJS({
  selectedFeature: '',
  location: false,
  search: '',
});

export const reducer = (state = defaults, action) => {
  switch (action.type) {
    case Types.VIEW_TWO_SETTINGS:
      return state.merge(action.payload);
    default:
      return state;
  }
};
