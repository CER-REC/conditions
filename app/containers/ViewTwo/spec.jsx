import React from 'react';
import { shallow } from 'enzyme';
import MyComponentName from '.';

describe('Components|MyComponentName', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<MyComponentName />);
    });

    test('should render', () => {
      expect(wrapper.type()).toEqual('div');
    });

  });
});

