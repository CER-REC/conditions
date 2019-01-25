import React from 'react';
import { shallow } from 'enzyme';

import DownloadsTextBox from '.';

const openDataModal = () => {};
const openScreenshotModal = () => {};

describe('Components|MainInfoBar/DownloadsTextBox', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<DownloadsTextBox
        openDataModal={openDataModal}
        openScreenshotModal={openScreenshotModal}
      />);
    });

    test('should render', () => {
      expect(wrapper.type()).toBe('div');
    });

    test('should have a className', () => {
      expect(wrapper.is('.DownloadsTextBox')).toBe(true);
    });
  });
});
