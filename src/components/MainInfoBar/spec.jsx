import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import MainInfoBar from '.';

describe('Components|MainInfoBar', () => {
  let spy;
  beforeEach(() => {
    spy = {
      setActiveDialog: jest.fn(),
      toggleExpanded: jest.fn(),
      openDataModal: jest.fn(),
      openScreenshotModal: jest.fn(),
    };
  });

  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<MainInfoBar
        pdfUrl=""
        expanded
        {...spy}
      />);
    });

    shouldBehaveLikeAComponent(MainInfoBar, () => wrapper);

    test('should pass its setActiveDialog callback to the heading buttons', () => {
      wrapper.find('.MainInfoBar')
        .find('.textButton')
        .first()
        .props()
        .onClick('about');

      expect(spy.setActiveDialog).toHaveBeenCalledTimes(1);
    });

    test('should pass its setActiveDialog callback to the collapse arrows', () => {
      wrapper.find('.MainInfoBar')
        .find('CircleContainer')
        .props()
        .onClick();

      expect(spy.toggleExpanded).toHaveBeenCalledTimes(1);
    });
  });

  describe('passing information to the content boxes', () => {
    test('should pass the pdfUrl to the Methodology box', () => {
      const testUrl = 'abc';

      const wrapper = shallow(<MainInfoBar
        pdfUrl={testUrl}
        activeDialog="methodology"
        {...spy}
      />);

      const url = wrapper.find('.MainInfoBar')
        .find('MethodologyBox')
        .props()
        .pdfUrl;

      expect(url).toBe(testUrl);
    });

    test('should pass its openDataModal and openScreenshotModal callbacks to the Downloads box', () => {
      const wrapper = shallow(<MainInfoBar
        pdfUrl=""
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
