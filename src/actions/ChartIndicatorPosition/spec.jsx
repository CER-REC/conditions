import * as ChartIndicatorPosition from './index';

describe('actions/chartIndicatorPosition', () => {
  it('should update the position of the chart indicator based on the action in the Bubble Chart', () => {
    const position = 'OC';
    const action = ChartIndicatorPosition.bubble(position);
    expect(ChartIndicatorPosition.reducer(undefined, action)).toHaveProperty('bubble', 'OC');
  });

  it('should update the position of the chart indicator based on the action in the Streamgraph', () => {
    const position = 2015;
    const action = ChartIndicatorPosition.stream(position);
    expect(ChartIndicatorPosition.reducer(undefined, action)).toHaveProperty('stream', 2015);
  });
});
