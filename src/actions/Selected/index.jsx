export const Types = {
  SELECTED_FEATURE: 'selectedFeature',
  SELECTED_SUBFEATURE: 'selectedSubFeature',
  SELECTED_COMPANY: 'selectedCompany',
  SELECTED_PROJECT: 'selectedProject',
  SELECTED_CONDITION: 'selectedCondition',
};

export const selectedFeature = feature => ({
  type: Types.SELECTED_FEATURE,
  payload: { feature },
});

export const selectedSubFeature = subFeature => ({
  type: Types.SELECTED_SUBFEATURE,
  payload: { subFeature },
});

export const selectedCompany = company => ({
  type: Types.SELECTED_COMPANY,
  payload: { company },
});

export const selectedProject = project => ({
  type: Types.SELECTED_PROJECT,
  payload: { project },
});

export const selectedCondition = condition => ({
  type: Types.SELECTED_CONDITION,
  payload: { condition },
});

const initialState = {
  feature: 'theme',
  subfeature: '',
  company: '',
  project: '',
  condition: '',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SELECTED_FEATURE: return { ...state, selectedFeature: action.payload.feature };
    case Types.SELECTED_SUBFEATURE: return {
      ...state, selectedSubFeature: action.payload.subFeature,
    };
    case Types.SELECTED_COMPANY: return { ...state, selectedCompany: action.payload.company };
    case Types.SELECTED_PROJECT: return { ...state, selectedProject: action.payload.project };
    case Types.SELECTED_CONDITION: return { ...state, selectedCondition: action.payload.condition };
    default: return state;
  }
};
