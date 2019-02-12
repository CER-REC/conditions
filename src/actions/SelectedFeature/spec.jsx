import * as actions from './index';

describe('actions', () => {
  it('should create an action to select a feature', () => {
    const feature = 'phase';
    const expectedAction = {
      payload: {
        feature: 'phase',
      },
      type: actions.Types.SELECTED_FEATURE,
    };
    expect(actions.selectedFeature(feature)).toEqual(expectedAction);
  });
});

