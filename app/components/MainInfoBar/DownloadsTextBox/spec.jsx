import React from 'react';
import { shallow } from 'enzyme';

import DownloadsTextBox from '.';

describe('Components|MainInfoBar/DownloadsTextBox', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<DownloadsTextBox />);
    });

    test('should render', () => {
      expect(wrapper.type()).toBe('div');
    });

    test('should have a className', () => {
      expect(wrapper.is('.DownloadsTextBox')).toBe(true);
    });
  });
});
