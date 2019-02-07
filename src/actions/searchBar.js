import { fromJS } from 'immutable';

export const Types = {
  KEYWORDS: 'keywords',
  EXCEPT_KEYWORDS: 'exceptKeywords',
  FIND_ANY: 'findAny',
  YEAR_RANGE: 'yearRange',
  PROJECT_STATUS: 'projectStatus',
  FILTER_TAB: 'filterTab',
};

export const keywords = keyWord => ({
  type: Types.KEYWORDS,
  payload: { keyWord },
});

export const exceptKeywords = exceptKeyword => ({
  type: Types.EXCEPT_KEYWORDS,
  payload: { exceptKeyword },
});

export const findAny = () => ({
  type: Types.FIND_ANY,
  payload: { },
});

export const yearRange = range => ({
  type: Types.YEAR_RANGE,
  payload: { range },
});

export const projectStatus = status => ({
  type: Types.PROJECT_STATUS,
  payload: { status },
});

export const filterTab = () => ({
  type: Types.FILTER_TAB,
  payload: { },
});

const initialState = fromJS({
  keyWord: [''],
  exceptKeyword: [''],
  findAny: true,
  range: { start: 0, end: 0 },
  status: '',
  filterTab: true,
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.KEYWORDS:
      return state.set('keywords', action.payload.keyword);
    case Types.EXCEPT_KEYWORDS:
      return state.set('exceptKeywords', action.payload.exceptKeyword);
    case Types.FIND_ANY:
      return state.set('findAny', action.payload);
    case Types.YEAR_RANGE:
      return state.set('yearRange', action.payload.range);
    case Types.PROJECT_STATUS:
      return state.set('projectStatus', action.payload.status);
    case Types.FILTER_TAB:
      return state.set('filterTab', action.payload);
    default: return state;
  }
};

