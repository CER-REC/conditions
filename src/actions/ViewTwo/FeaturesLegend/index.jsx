import { Types as viewTwo } from '../index';

export const reducer = (state, action) => {
  switch (action.type) {
    case viewTwo.SELECTED_FEATURE:
    case viewTwo.MODE:
    default: return state;
  }
};
