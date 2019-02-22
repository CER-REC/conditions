import * as selected from './index';

describe('actions/selected', () => {
  it('should update the feature state based on the action', () => {
    const feature = 'phase';
    const action = selected.setSelectedFeature(feature);
    expect(selected.reducer(undefined, action)).toHaveProperty('feature', feature);
  });

  it('should update the subfeature state based on the action', () => {
    const subFeature = 'security';
    const action = selected.setSelectedSubFeature(subFeature);
    expect(selected.reducer(undefined, action)).toHaveProperty('subfeature', subFeature);
  });

  it('should update the company state based on the action', () => {
    const company = 'testCompany';
    const action = selected.setSelectedCompany(company);
    expect(selected.reducer(undefined, action)).toHaveProperty('company', company);
  });

  it('should update the project state based on the action', () => {
    const project = 'testProject';
    const action = selected.setSelectedProject(project);
    expect(selected.reducer(undefined, action)).toHaveProperty('project', project);
  });

  it('should update the condition state based on the action', () => {
    const condition = 'testCondition';
    const action = selected.setSelectedCondition(condition);
    expect(selected.reducer(undefined, action)).toHaveProperty('condition', condition);
  });
});
