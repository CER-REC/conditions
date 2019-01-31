import React from 'react';
import { shallow } from 'enzyme';
import ViewThree from '.';

describe('Components|ViewThree', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ViewThree />);
    });

    test('should render', () => {
      expect(wrapper.type()).toEqual('div');
    });
  });
});
