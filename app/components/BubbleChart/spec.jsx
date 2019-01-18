import React from 'react';
import { shallow } from 'enzyme';
import BubbleChart from '.';

describe('Components|BubbleChart', () => {
  describe('without a selectedCategory equal to Instrument', () => {
    test('should not render a div', () => {
      const wrapper = shallow(<BubbleChart selectedCategory="test" />);
      expect(wrapper.type()).toBeNull();
    });
  });
  describe('with a selectedCategory', () => {
    test('should render a div', () => {
      const wrapper = shallow(<BubbleChart selectedCategory="instrument" />);
      expect(wrapper.type()).toBe('div');
    });

    test('should render a bubbleChart class', () => {
      const wrapper = shallow(<BubbleChart selectedCategory="instrument" />);
      expect(wrapper.find('.BubbleChart')).toHaveLength(1);
    });
  });
});
