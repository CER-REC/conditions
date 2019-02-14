import * as DetailView from './index';

describe('actions/detailView', () => {
  it('should update the detail view state based on the action', () => {
    const action = DetailView.expandDetailView();
    expect(DetailView.reducer(undefined, action)).toEqual(true);
  });
});
