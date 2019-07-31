import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import MainInfoBar from '.';
import DownloadBox from './DownloadBox';
import CircleContainer from '../CircleContainer';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|MainInfoBar', () => {
  let spy;
  beforeEach(() => {
    spy = {
      setPane: jest.fn(),
      openDataModal: jest.fn(),
    };
  });

  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<MainInfoBar
        pane="methodology"
        {...spy}
      />);
    });

    shouldBehaveLikeAComponent(MainInfoBar, () => wrapper);

    test('should pass its setPane callback to the heading buttons', () => {
      wrapper.find('.MainInfoBar')
        .find('.textButton')
        .first()
        .simulate('click', eventFuncs);

      expect(spy.setPane).toHaveBeenCalledTimes(1);
      expect(spy.setPane.mock.calls[0][0]).toBe('about');
    });

    test('should pass its setPane callback to the collapse arrows', () => {
      wrapper.find('.MainInfoBar')
        .find(CircleContainer)
        .simulate('click', eventFuncs);

      expect(spy.setPane).toHaveBeenCalledTimes(1);
      expect(spy.setPane.mock.calls[0][0]).toBe('');
    });
  });

  describe('passing information to the content boxes', () => {
    test('should pass its openDataModal callback to the Downloads box', () => {
      const wrapper = shallow(<MainInfoBar
        pane="download"
        {...spy}
      />);

      wrapper.find('.MainInfoBar')
        .find(DownloadBox)
        .props()
        .openDataModal();

      expect(spy.openDataModal).toHaveBeenCalledTimes(1);
    });
  });
});
