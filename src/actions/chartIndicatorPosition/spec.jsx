import * as chartIndicatorPosition from './index';
import { compareReduxChange } from '../../tests/utilities';

describe('actions/chartIndicatorPosition', () => {
  it('should update the position of the chart indicator based on the action in the Bubble Chart', () => {
    const position = 'OC';
    const action = chartIndicatorPosition.setBubbleChartIndicator(position);
    const newState = chartIndicatorPosition.reducer(undefined, action);
    expect(newState).toHaveProperty('bubble', 'OC');
    compareReduxChange(chartIndicatorPosition.reducer, newState);
  });

  it('should update the position of the chart indicator based on the action in the Streamgraph', () => {
    const position = 2015;
    const action = chartIndicatorPosition.setStreamGraphIndicator(position);
    const newState = chartIndicatorPosition.reducer(undefined, action);
    expect(newState).toHaveProperty('stream', 2015);
    compareReduxChange(chartIndicatorPosition.reducer, newState);
  });
});
