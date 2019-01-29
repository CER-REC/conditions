import React from 'react';
import { shallow } from 'enzyme';
import ViewOne from '.';

describe('Components|Grid/ViewOne', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ViewOne><></></ViewOne>);
    });
    test('should render', () => {
      expect(wrapper.type()).toEqual('section');
    });
    test('should accept classNames', () => {
      wrapper.setProps({ className: 'item' });
      wrapper.setProps({ focused: true });
      expect(wrapper.find('.item').hasClass('focused')).toBe(true);
      wrapper.setProps({ focused: false });
      expect(wrapper.find('.item').hasClass('focused')).toBe(false);
    });
  });
});
