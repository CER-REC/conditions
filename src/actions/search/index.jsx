export const Types = {
  INCLUDED: 'included',
  EXCLUDED: 'excluded',
  FIND_ANY: 'findAny',
  PROJECT_STATUS: 'projectStatus',
  PROJECT_YEAR: 'projectYear',
};

export const setIncluded = included => ({
  type: Types.INCLUDED,
  payload: { included },
});

export const setExcluded = excluded => ({
  type: Types.EXCLUDED,
  payload: { excluded },
});

export const setFindAny = findAny => ({
  type: Types.FIND_ANY,
  payload: { findAny },
});

export const setProjectStatus = projectStatus => ({
  type: Types.PROJECT_STATUS,
  payload: { projectStatus },
});

export const setProjectYear = projectYear => ({
  type: Types.PROJECT_YEAR,
  payload: { projectYear },
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
  availableProjectYear: {
    start: 2010,
    end: 2018,
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.INCLUDED: return { ...state, included: action.payload.included };
    case Types.EXCLUDED: return { ...state, excluded: action.payload.excluded };
    case Types.FIND_ANY: return { ...state, findAny: action.payload.findAny };
    case Types.PROJECT_STATUS: return { ...state, projectStatus: action.payload.projectStatus };
    case Types.PROJECT_YEAR: return { ...state, projectYear: action.payload.projectYear };
    default: return state;
  }
};
