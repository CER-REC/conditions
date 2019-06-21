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

  it('should update the company state based on the action', () => {
    const company = 'testCompany';
    const newState = selected.reducer(undefined, selected.setSelectedCompany(company));
    expect(newState).toHaveProperty('company', company);
    compareReduxChange(selected.reducer, newState);
  });

  it('should update the region state based on the action', () => {
    const region = 'testRegion';
    const newState = selected.reducer(undefined, selected.setSelectedRegion(region));
    expect(newState).toHaveProperty('region', region);
    compareReduxChange(selected.reducer, newState);
  });

  it('should update the project state based on the action', () => {
    const project = 'testProject';
    const newState = selected.reducer(undefined, selected.setSelectedProject(project));
    expect(newState).toHaveProperty('project', project);
    compareReduxChange(selected.reducer, newState);
  });

  it('should update the instrument state based on the action', () => {
    const instrument = 'testInstrument';
    const newState = selected.reducer(undefined, selected.setSelectedInstrument(instrument));
    expect(newState).toHaveProperty('instrument', instrument);
    compareReduxChange(selected.reducer, newState);
  });

  it('should update the condition state based on the action', () => {
    const condition = 'testCondition';
    const newState = selected.reducer(undefined, selected.setSelectedCondition(condition));
    expect(newState).toHaveProperty('condition', condition);
    compareReduxChange(selected.reducer, newState);
  });
});
