import * as Search from './index';

describe('actions/search', () => {
  it('should update the included words based on the action', () => {
    const included = ['testIncluded'];
    const action = Search.included(included);
    expect(Search.reducer(undefined, action)).toHaveProperty('included', ['testIncluded']);
  });

  it('should update the excluded words based on the action', () => {
    const excluded = ['testExcluded'];
    const action = Search.excluded(excluded);
    expect(Search.reducer(undefined, action)).toHaveProperty('excluded', ['testExcluded']);
  });

  it('should update the find any key based on the action', () => {
    const findAny = true;
    const action = Search.findAny(findAny);
    expect(Search.reducer(undefined, action)).toHaveProperty('findAny', true);
  });

  it('should update the project status based on the action', () => {
    const projectStatus = ['testStatus'];
    const action = Search.projectStatus(projectStatus);
    expect(Search.reducer(undefined, action)).toHaveProperty('projectStatus', ['testStatus']);
  });

  it('should update the project year range based on the action', () => {
    const projectYear = { start: 2010, end: 2012 };
    const action = Search.projectYear(projectYear);
    expect(Search.reducer(undefined, action)).toHaveProperty(
      'projectYear',
      { start: 2010, end: 2012 },
    );
  });
});
