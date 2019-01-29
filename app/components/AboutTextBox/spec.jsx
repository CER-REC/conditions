import React from 'react';
import { shallow } from 'enzyme';

import AboutTextBox from '.';

describe('Components|AboutTextBox', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<AboutTextBox />);
    });

    test('should render', () => {
      expect(wrapper.type()).toBe('div');
    });

    test('should have a className', () => {
      expect(wrapper.is('.AboutTextBox')).toBe(true);
    });
  });
});
