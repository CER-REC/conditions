import * as SelectedFeature from './index';

describe('actions/selectedFeature', () => {
  it('should update the state based on the action', () => {
    const feature = 'phase';
    const action = SelectedFeature.selectedFeature(feature);
    expect(SelectedFeature.reducer(undefined, action)).toHaveProperty('selectedFeature', 'phase');
  });
});

