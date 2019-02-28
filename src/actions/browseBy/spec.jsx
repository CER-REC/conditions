import * as browseBy from './index';
import { compareReduxChange } from '../../tests/utilities';

describe('actions/browseBy', () => {
  it('should update the mode state based on the action', () => {
    const mode = 'location';
    const newState = browseBy.reducer(undefined, browseBy.setBrowseBy(mode));
    expect(newState).toBe('location');
    compareReduxChange(browseBy.reducer, newState);
  });
});
