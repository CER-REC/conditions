import React from 'react';
import { shallow } from 'enzyme';

import MethodologyTextBox from '.';

describe('Components|MainInfoBar/MethodologyTextBox', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<MethodologyTextBox />);
    });

    test('should render', () => {
      expect(wrapper.type()).toBe('div');
    });

    test('should have a className', () => {
      expect(wrapper.is('.MethodologyTextBox')).toBe(true);
    });
  });
});
