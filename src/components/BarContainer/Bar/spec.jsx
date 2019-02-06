import React from 'react';
import { shallow } from 'enzyme';

import Bar from '.';

describe('Components|BarContainer/Bar', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Bar width={0} height={0} x={0} y={0} fill="" />);
    });

    test('should render a rect', () => {
      expect(wrapper.type()).toBe('rect');
    });

    test('should have an Bar class', () => {
      expect(wrapper.is('.Bar')).toBe(true);
    });

    test('should accept a width', () => {
      expect(wrapper.props().width).toBe(0);
      wrapper.setProps({ width: 10 });
      expect(wrapper.props().width).toBe(10);
    });

    test('should accept a height', () => {
      expect(wrapper.props().height).toBe(0);
      wrapper.setProps({ height: 10 });
      expect(wrapper.props().height).toBe(10);
    });

    test('should have a initial x value', () => {
      expect(wrapper.props().x).toBe(0);
      wrapper.setProps({ x: 10 });
      expect(wrapper.props().x).toBe(10);
    });

    test('should have a initial y value', () => {
      expect(wrapper.props().y).toBe(0);
      wrapper.setProps({ y: 10 });
      expect(wrapper.props().y).toBe(10);
    });

    test('should have a fill color', () => {
      wrapper.setProps({ fill: 'tomato' });
      expect(wrapper.props().fill).toBe('tomato');
    });
  });
});
