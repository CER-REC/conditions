import * as search from './index';
import { compareReduxChange } from '../../tests/utilities';

describe('actions/search', () => {
  it('should update the included words based on the action', () => {
    const included = ['testIncluded'];
    const newState = search.reducer(undefined, search.setIncluded(included));
    expect(newState).toHaveProperty('included', ['testIncluded']);
    compareReduxChange(search.reducer, newState);
  });

  it('should update the excluded words based on the action', () => {
    const excluded = ['testExcluded'];
    const newState = search.reducer(undefined, search.setExcluded(excluded));
    expect(newState).toHaveProperty('excluded', ['testExcluded']);
    compareReduxChange(search.reducer, newState);
  });

  it('should update the find any key based on the action', () => {
    const findAny = true;
    const newState = search.reducer(undefined, search.setFindAny(findAny));
    expect(newState).toHaveProperty('findAny', true);
    compareReduxChange(search.reducer, newState);
  });

  it('should update the project status based on the action', () => {
    const projectStatus = ['testStatus'];
    const newState = search.reducer(undefined, search.setProjectStatus(projectStatus));
    expect(newState).toHaveProperty('projectStatus', ['testStatus']);
    compareReduxChange(search.reducer, newState);
  });

  it('should update the project year range based on the action', () => {
    const projectYear = { start: 2010, end: 2012 };
    const newState = search.reducer(undefined, search.setProjectYear(projectYear));
    expect(newState).toHaveProperty('projectYear', projectYear);
    compareReduxChange(search.reducer, newState);
  });
});
