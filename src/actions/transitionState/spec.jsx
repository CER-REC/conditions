import * as transitionState from './index';
import { compareReduxChange } from '../../tests/utilities';

describe('actions/transitionState', () => {
  it('should update the transition state based on the action', () => {
    const newTransitionState = 4;
    const newState = transitionState.reducer(
      undefined,
      transitionState.setTransitionState(newTransitionState),
    );
    expect(newState).toBe(4);
    compareReduxChange(transitionState.reducer, newState);
  });
});
