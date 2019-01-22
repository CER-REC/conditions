import React from 'react';
import { shallow } from 'enzyme';
import BubbleChart from '.';

const noop = () => {};
const emptyArray = [];

describe('Components|BubbleChart', () => {
  describe('without a selectedCategory equal to Instrument', () => {
    test('should not render a div', () => {
      const wrapper = shallow((
        <BubbleChart
          selectedCategory="test"
          instrumentChartData1={emptyArray}
          instrumentChartData2={emptyArray}
          onClick={noop}
        />
      ));
      expect(wrapper.type()).toBeNull();
    });
  });
  describe('with a selectedCategory', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow((
        <BubbleChart
          selectedCategory="instrument"
          instrumentChartData1={emptyArray}
          instrumentChartData2={emptyArray}
          onClick={noop}
        />
      ));
    });

    test('should render a div', () => {
      expect(wrapper.type()).toBe('div');
    });

    test('should render a bubbleChart class', () => {
      expect(wrapper.find('.BubbleChart')).toHaveLength(1);
    });
  });
});
