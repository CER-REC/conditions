import * as selected from './index';
import { compareReduxChange } from '../../tests/utilities';

describe('actions/selected', () => {
  it('should update the feature state based on the action', () => {
    const feature = 'phase';
    const newState = selected.reducer(undefined, selected.setSelectedFeature(feature));
    expect(newState).toHaveProperty('feature', feature);
    compareReduxChange(selected.reducer, newState);
  });

  it('should update the subFeature state based on the action', () => {
    const subFeature = 'SECURITY';
    const newState = selected.reducer(undefined, selected.setSelectedSubFeature(subFeature));
    expect(newState).toHaveProperty('subFeature', subFeature);
    compareReduxChange(selected.reducer, newState);
  });

  it('should merge state when using setSelectedMultiple', () => {
    const newState = selected.reducer(undefined, selected.setSelectedMultiple({
      company: 123,
      condition: 456,
    }));
    expect(newState).toHaveProperty('company', 123);
    expect(newState).toHaveProperty('condition', 456);
    // Test to make sure the old values haven't been removed
    expect(newState).toHaveProperty('instrument', 0);
    compareReduxChange(selected.reducer, newState);
  });
});
