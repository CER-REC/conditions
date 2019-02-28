import * as browseBy from './index';

describe('actions/browseBy', () => {
  it('should update the mode state based on the action', () => {
    const mode = 'location';
    const action = browseBy.browseBy(mode);
    const initialState = browseBy.reducer();
    const newState = browseBy.reducer(undefined, action);
    expect(newState).toHaveProperty('browseBy', 'location');
    expect(typeof initialState).toBe(typeof newState);
  });
});
