import React from 'react';
import { shallow } from 'enzyme';

import ShortcutInfoBar from '.';

const handleInfoBar = false;
const jumpToAbout = () => {};
const openDataModal = () => {};
const openScreenshotModal = () => {};

describe('Components|ShortcutInfoBar', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ShortcutInfoBar
        handleInfoBar={handleInfoBar}
        jumpToAbout={jumpToAbout}
        openDataModal={openDataModal}
        openScreenshotModal={openScreenshotModal}
      />);
    });

    test('should render', () => {
      expect(wrapper.type()).toBe('div');
    });

    test('should have a className', () => {
      expect(wrapper.is('.ShortcutInfoBar')).toBe(true);
    });

    test('should not show the info bar when it is closed', () => {
      wrapper.setProps({ handleInfoBar: false });
      expect(wrapper.find('InfoBar')).toHaveLength(0);
    });
  });
});
