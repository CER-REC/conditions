import React from 'react';
import { shallow } from 'enzyme';

import ShortcutInfoBar from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|ShortcutInfoBar', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ShortcutInfoBar
        jumpToAbout={noop}
        openDataModal={noop}
        openScreenshotModal={noop}
      />);
    });

    test('should render', () => {
      expect(wrapper.type()).toBe('div');
    });

    test('should have a className', () => {
      expect(wrapper.is('.ShortcutInfoBar')).toBe(true);
    });

    test('should show the info bar when it is clicked', () => {
      wrapper.find('.InfoButton').simulate('click', eventFuncs);
      expect(wrapper.find('.InfoBar')).toHaveLength(1);
    });
  });
});
