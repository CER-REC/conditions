export const Types = {
  SELECTED_FEATURE: 'selectedFeature',
  SELECTED_SUBFEATURE: 'selectedSubFeature',
  SELECTED_COMPANY: 'selectedCompany',
  SELECTED_PROJECT: 'selectedProject',
  SELECTED_CONDITION: 'selectedCondition',
};

export const setSelectedFeature = feature => ({
  type: Types.SELECTED_FEATURE,
  payload: { feature },
});

export const setSelectedSubFeature = subFeature => ({
  type: Types.SELECTED_SUBFEATURE,
  payload: { subFeature },
});

export const setSelectedCompany = company => ({
  type: Types.SELECTED_COMPANY,
  payload: { company },
});

export const setSelectedProject = project => ({
  type: Types.SELECTED_PROJECT,
  payload: { project },
});

export const setSelectedCondition = condition => ({
  type: Types.SELECTED_CONDITION,
  payload: { condition },
});

const initialState = {
  feature: 'theme',
  subFeature: '',
  company: '',
  project: '',
  condition: '',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SELECTED_FEATURE: return { ...state, subFeature: '', feature: action.payload.feature };
    case Types.SELECTED_SUBFEATURE: return {
      ...state, subFeature: action.payload.subFeature,
    };
    case Types.SELECTED_COMPANY: return { ...state, company: action.payload.company };
    case Types.SELECTED_PROJECT: return { ...state, project: action.payload.project };
    case Types.SELECTED_CONDITION: return { ...state, condition: action.payload.condition };
    default: return state;
  }
};