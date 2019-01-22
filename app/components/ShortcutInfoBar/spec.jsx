import React from 'react';
import { shallow } from 'enzyme';

import ShortcutInfoBar from '.';

describe('Components|ShortcutInfoBar', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ShortcutInfoBar
        onChange={() => {}}
        handleInfoBar={() => {}}
        jumpToAbout={() => {}}
        openDataModal={() => {}}
        openScreenshotModal={() => {}}
      />);
    });

    test('should render', () => {
      expect(wrapper.type()).toBe('div');
    });

    test('should have a className', () => {
      expect(wrapper.is('.ShortcutInfoBar')).toBe(true);
    });

    test('should show four share icons', () => {
      expect(wrapper.find('ShareIcon')).toHaveLength(4);
    });

    test('should show three text links', () => {
      expect(wrapper.find('button')).toHaveLength(1);
    });

    test('should not show the info bar when it is closed', () => {
      wrapper.setProps({ handleInfoBar: false });
      expect(wrapper.find('InfoBar')).toHaveLength(0);
    });
  });
});
