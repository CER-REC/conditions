import React from 'react';
import { shallow } from 'enzyme';
import Grid from '.';

describe('Components|Grid', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Grid><p /><p /><p /><p /></Grid>);
    });

    test('should render', () => {
      expect(wrapper.type()).toBe('main');
      wrapper.setProps({ type: 'div' });
      expect(wrapper.type()).toBe('div');
    });

    test('should render', () => {
      expect(wrapper.type()).toBe('main');
    });

    test('should have a class to contain the grid', () => {
      expect(wrapper.is('.Grid')).toBe(true);
    });

    test('should have no typedWrapper', () => {
      expect(wrapper.props().type).toBe(undefined);
    });
    test('should have sections for each child', () => {
      expect(wrapper.find('p')).toHaveLength(4);
    });
  });
});
