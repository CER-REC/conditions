import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import MainInfoBar from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|MainInfoBar', () => {
  let spy;
  beforeEach(() => {
    spy = {
      setActiveDialog: jest.fn(),
      openDataModal: jest.fn(),
      openScreenshotModal: jest.fn(),
    };
  });

  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<MainInfoBar
        activeDialog="methodology"
        {...spy}
      />);
    });

    shouldBehaveLikeAComponent(MainInfoBar, () => wrapper);

    test('should pass its setActiveDialog callback to the heading buttons', () => {
      wrapper.find('.MainInfoBar')
        .find('.textButton')
        .first()
        .simulate('click', eventFuncs);

      expect(spy.setActiveDialog).toHaveBeenCalledWith('about');
    });

    test('should pass its setActiveDialog callback to the collapse arrows', () => {
      wrapper.find('.MainInfoBar')
        .find('CircleContainer')
        .simulate('click', eventFuncs);

      expect(spy.setActiveDialog).toHaveBeenCalledWith('');
    });
  });

  describe('passing information to the content boxes', () => {
    test('should pass its openDataModal and openScreenshotModal callbacks to the Downloads box', () => {
      const wrapper = shallow(<MainInfoBar
        activeDialog="downloads"
        {...spy}
      />);

      wrapper.find('.MainInfoBar')
        .find('DownloadsBox')
        .props()
        .openDataModal();

      expect(spy.openDataModal).toHaveBeenCalledTimes(1);

      wrapper.find('.MainInfoBar')
        .find('DownloadsBox')
        .props()
        .openScreenshotModal();

      expect(spy.openScreenshotModal).toHaveBeenCalledTimes(1);
    });
  });
});
