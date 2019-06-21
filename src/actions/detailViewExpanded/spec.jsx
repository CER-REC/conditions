import * as detailViewExpanded from './index';
import { compareReduxChange } from '../../tests/utilities';

describe('actions/detailViewExpanded', () => {
  it('should update the detail view state based on the action', () => {
    const action = detailViewExpanded.toggleDetailView();
    const newState = detailViewExpanded.reducer(undefined, action);
    expect(newState).toEqual(false);
    compareReduxChange(detailViewExpanded.reducer, newState);
  });
});
