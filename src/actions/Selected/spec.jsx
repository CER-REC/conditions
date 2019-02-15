import * as Selected from './index';

describe('actions/selected', () => {
  it('should update the feature state based on the action', () => {
    const feature = 'phase';
    const action = Selected.selectedFeature(feature);
    expect(Selected.reducer(undefined, action)).toHaveProperty('selectedFeature', 'phase');
  });

  it('should update the subfeature state based on the action', () => {
    const subFeature = 'security';
    const action = Selected.selectedSubFeature(subFeature);
    expect(Selected.reducer(undefined, action)).toHaveProperty('selectedSubFeature', 'security');
  });

  it('should update the company state based on the action', () => {
    const company = 'testCompany';
    const action = Selected.selectedCompany(company);
    expect(Selected.reducer(undefined, action)).toHaveProperty('selectedCompany', 'testCompany');
  });

  it('should update the project state based on the action', () => {
    const project = 'testProject';
    const action = Selected.selectedProject(project);
    expect(Selected.reducer(undefined, action)).toHaveProperty('selectedProject', 'testProject');
  });

  it('should update the condition state based on the action', () => {
    const condition = 'testCondition';
    const action = Selected.selectedCondition(condition);
    expect(Selected.reducer(undefined, action)).toHaveProperty('selectedCondition', 'testCondition');
  });
});
