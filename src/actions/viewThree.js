import Immutable from 'immutable';

export const Types = {
  VIEW_THREE_SETTINGS: 'viewThreeSettings',
};

export const viewThreeSettings = (feature, subFeature, companyId) => ({
  type: Types.VIEW_THREE_SETTINGS,
  payload: {
    feature,
    subFeature,
    companyId,
  },
});

const defaults = Immutable.fromJS({
  feature: '',
  subFeature: '',
  companyId: 0,
});

export const reducer = (state = defaults, action) => {
  switch (action.type) {
    case Types.VIEW_THREE_SETTINGS:
      return state.merge(action.payload);
    default:
      return state;
  }
};
