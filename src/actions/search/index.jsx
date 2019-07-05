export const Types = {
  INCLUDED: 'included',
  EXCLUDED: 'excluded',
  FIND_ANY: 'findAny',
  PROJECT_STATUS: 'projectStatus',
  PROJECT_YEAR: 'projectYear',
  SEARCH_RESULTS: 'searchResults',
  FILTERED_PROJECTS: 'filteredProjects',
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

export const setSearchResults = searchResults => ({
  type: Types.SEARCH_RESULTS,
  payload: { searchResults },
});

export const setFilteredProjects = filteredProjects => ({
  type: Types.FILTERED_PROJECTS,
  payload: { filteredProjects },
});

const initialState = {
  included: [],
  excluded: [],
  findAny: true,
  projectStatus: ['IN_PROGRESS', 'COMPLETED'],
  projectYear: {
    start: 0,
    end: 0,
  },
  searchResults: {
    companyIdLookup: [],
    conditionIdLookup: [],
    projectIdLookup: [],
  },
  filteredProjects: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.INCLUDED: return { ...state, included: action.payload.included };
    case Types.EXCLUDED: return { ...state, excluded: action.payload.excluded };
    case Types.FIND_ANY: return { ...state, findAny: action.payload.findAny };
    case Types.PROJECT_STATUS: return { ...state, projectStatus: action.payload.projectStatus };
    case Types.PROJECT_YEAR: return { ...state, projectYear: action.payload.projectYear };
    case Types.SEARCH_RESULTS: return { ...state, searchResults: action.payload.searchResults };
    case Types.FILTERED_PROJECTS: return {
      ...state,
      filteredProjects: action.payload.filteredProjects,
    };
    default: return state;
  }
};
