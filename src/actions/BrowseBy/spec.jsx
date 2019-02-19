import * as BrowseBy from './index';

describe('actions/browseBy', () => {
  it('should update the mode state based on the action', () => {
    const mode = 'location';
    const action = BrowseBy.browseBy(mode);
    expect(BrowseBy.reducer(undefined, action)).toHaveProperty('browseBy', 'location');
  });
});
