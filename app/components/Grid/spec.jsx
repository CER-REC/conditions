import React from 'react';
import { shallow } from 'enzyme';
import Grid from '.';

describe('Components|Grid', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Grid rows={0} columns={0} />);
    });

    test('should render', () => {
      expect(wrapper.type()).toBe('div');
    });

    test('should have a class to contain the grid', () => {
      expect(wrapper.is('.Grid')).toBe(true);
    });

    test('should expect a prop for rows', () => {
      wrapper.setProps({ rows: 3 });
      expect(wrapper.props().rows).toBe(3);
    });

    test('should expect a prop for columns', () => {
      wrapper.setProps({ columns: 3 });
      expect(wrapper.props().columns).toBe(3);
    });

    test('should expect a prop for row gutters', () => {
      wrapper.setProps({ rowGutters: '15px' });
      expect(wrapper.props().rowGutters).toBe('15px');
    });

    test('should expect a prop for column gutters', () => {
      wrapper.setProps({ columnGutters: '15px' });
      expect(wrapper.props().columnGutters).toBe('15px');
    });
  });
});
