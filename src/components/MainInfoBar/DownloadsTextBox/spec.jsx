import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

import DownloadsTextBox from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|MainInfoBar/DownloadsTextBox', () => {
  describe('with default props', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = {
        data: jest.fn(),
        screen: jest.fn(),
      };

      wrapper = shallow(<DownloadsTextBox
        openDataModal={spy.data}
        openScreenshotModal={spy.screen}
      />);
    });

    shouldBehaveLikeAComponent(DownloadsTextBox, () => wrapper);

    test('should pass its openDataModal callback to the data link', () => {
      wrapper.find('.DownloadsTextBox')
        .find('button')
        .first()
        .simulate('click', eventFuncs);

      expect(spy.data).toHaveBeenCalledTimes(1);
    });

    test('should pass its openScreenshotModal callback to the image link', () => {
      wrapper.find('.DownloadsTextBox')
        .find('button')
        .last()
        .simulate('click', eventFuncs);

      expect(spy.screen).toHaveBeenCalledTimes(1);
    });
  });
});
