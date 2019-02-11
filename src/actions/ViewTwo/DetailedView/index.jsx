import { fromJS } from 'immutable';
import { Types as viewTwo } from '../index';

export const Types = {
  SELECTED_ID: 'selectedId',
  PROJECT_NAME: 'projectName',
};

export const selectedId = id => ({
  type: Types.SELECTED_ID,
  payload: { id },
});

export const projectName = project => ({
  type: Types.PROJECT_NAME,
  payload: { project },
});

const initialState = fromJS({
  selectedId: '',
  projectName: '',
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SELECTED_ID:
      return state.set('selectedId', action.payload.id);
    case Types.PROJECT_NAME:
      return state.set('projectName', action.payload.projectName);
    case viewTwo.SELECTED_FEATURE:
    default: return state;
  }
};
