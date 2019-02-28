export const Types = {
  INCLUDED: 'included',
  EXCLUDED: 'excluded',
  FIND_ANY: 'findAny',
  PROJECT_STATUS: 'projectStatus',
  PROJECT_YEAR: 'projectYear',
};

export const setIncluded = includedKey => ({
  type: Types.INCLUDED,
  payload: { includedKey },
});

export const setExcluded = excludedKey => ({
  type: Types.EXCLUDED,
  payload: { excludedKey },
});

export const setFindAny = findAnyKey => ({
  type: Types.FIND_ANY,
  payload: { findAnyKey },
});

export const setProjectStatus = status => ({
  type: Types.PROJECT_STATUS,
  payload: { status },
});

export const setProjectYear = yearRange => ({
  type: Types.PROJECT_YEAR,
  payload: { yearRange },
});

const initialState = {
  included: [],
  excluded: [],
  findAny: true,
  projectStatus: ['OPEN', 'CLOSED', 'CANCELLED'],
  projectYear: {
    start: 2010,
    end: 2018,
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.INCLUDED: return { ...state, included: action.payload.includedKey };
    case Types.EXCLUDED: return { ...state, excluded: action.payload.excludedKey };
    case Types.FIND_ANY: return { ...state, findAny: action.payload.findAnyKey };
    case Types.PROJECT_STATUS: return { ...state, projectStatus: action.payload.status };
    case Types.PROJECT_YEAR: return { ...state, projectYear: action.payload.yearRange };
    default: return state;
  }
};
