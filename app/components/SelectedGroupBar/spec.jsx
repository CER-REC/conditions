import React from 'react';
import { shallow } from 'enzyme';

import SelectedGroupBar from '.';

describe('Components|SelectedGroupBar', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<SelectedGroupBar group="components.companyWheel.wheelRay.title">Company Name</SelectedGroupBar>);
    });

    test('should render', () => {
      expect(wrapper.type()).toBe('div');
    });

    test('should have a SelectedGroupBar class', () => {
      expect(wrapper.is('.SelectedGroupBar')).toBe(true);
    });

    test('should have a child element to render the group and group-item', () => {
      expect(wrapper.find('.SelectedGroupBar').children()).toHaveLength(1);
    });
  });
  describe('with default props', () => {
    test('should accept both props for the group and groupItem text', () => {
      const wrapper = shallow(<SelectedGroupBar group="Conditions">condition</SelectedGroupBar>);
      expect(wrapper.find('FormattedMessage')).toHaveLength(1);
      expect(wrapper.find('span').last().text()).toBe('condition');
    });

    test('should accept a prop for the background color', () => {
      const wrapper = shallow(<SelectedGroupBar group="Conditions" backgroundColor="tomato">condition</SelectedGroupBar>);
      expect(wrapper.find('p').props().style.background).toBe('tomato');
    });

    test('should accept a prop to set the group text size', () => {
      const wrapper = shallow(<SelectedGroupBar group="Conditions" groupSize={32}>condition</SelectedGroupBar>);
      expect(wrapper.children().first().props().style.fontSize).toBe(32);
    });

    test('should accept a prop to set the groupitem text size', () => {
      const wrapper = shallow(<SelectedGroupBar group="Conditions" groupItemSize={14} groupSize={20}>condition</SelectedGroupBar>);
      expect(wrapper.children().first().props().style.fontSize).toBe(20);
      expect(wrapper.find('span').first().props().style.fontSize).toBe(14);
    });
  });
});

