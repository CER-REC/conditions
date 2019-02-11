import { fromJS } from 'immutable';

export const Types = {
  SELECTED_FEATURE: 'viewThree.selectedFeature',
  SUB_FEATURE: 'viewThree.subFeature',
  COMPANY_ID: 'viewThree.companyId',
};

export const selectedFeature = feature => ({
  type: Types.SELECTED_FEATURE,
  payload: { feature },
});

export const setSubFeature = subFeature => ({
  type: Types.SUB_FEATURE,
  payload: { subFeature },
});

export const setCompanyId = companyId => ({
  type: Types.COMPANY_ID,
  payload: { companyId },
});

const initialState = fromJS({
  selectedFeature: 'Theme',
  subFeature: 'all',
  companyId: 0,
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SELECTED_FEATURE:
      return state.set('selectedFeature', action.payload.feature);
    case Types.SUB_FEATURE:
      return state.set('subFeature', action.payload.subFeature);
    case Types.COMPANY_ID:
      return state.set('companyId', action.payload.companyId);
    default: return state;
  }
};
