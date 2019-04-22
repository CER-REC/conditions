export const Types = {
  SELECTED_FEATURE: 'selectedFeature',
  SELECTED_SUBFEATURE: 'selectedSubFeature',
  SELECTED_INDICATOR: 'selectedIndicator',
  SELECTED_COMPANY: 'selectedCompany',
  SELECTED_PROJECT: 'selectedProject',
  SELECTED_CONDITION: 'selectedCondition',
  SELECTED_KEYWORDID: 'selectedKeywordId',
};

export const setSelectedFeature = feature => ({
  type: Types.SELECTED_FEATURE,
  payload: { feature },
});

export const setSelectedSubFeature = subFeature => ({
  type: Types.SELECTED_SUBFEATURE,
  payload: { subFeature },
});

export const setSelectedIndicator = indicator => ({
  type: Types.SELECTED_INDICATOR,
  payload: { indicator },
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

export const setSelectedKeywordId = keywordId => ({
  type: Types.SELECTED_KEYWORDID,
  payload: { keywordId },
});

const initialState = {
  feature: 'theme',
  subFeature: '',
  company: '',
  project: null,
  condition: { instrumentIndex: 0, itemIndex: 0 },
  indicator: '',
  keywordId: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SELECTED_FEATURE: return { ...state, subFeature: '', feature: action.payload.feature };
    case Types.SELECTED_SUBFEATURE: return {
      ...state, subFeature: action.payload.subFeature,
    };
    case Types.SELECTED_INDICATOR: return { ...state, indicator: action.payload.indicator };
    case Types.SELECTED_COMPANY: return { ...state, company: action.payload.company };
    case Types.SELECTED_PROJECT: return { ...state, project: action.payload.project };
    case Types.SELECTED_CONDITION: return { ...state, condition: action.payload.condition };
    case Types.SELECTED_KEYWORDID: return { ...state, keywordId: action.payload.keywordId };
    default: return state;
  }
};
