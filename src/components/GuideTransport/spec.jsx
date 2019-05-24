import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import GuideTransport from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|GuideTransport', () => {
  describe('with default props', () => {
    let spy;

    let wrapper;
    beforeEach(() => {
      spy = {
        back: jest.fn(),
        forward: jest.fn(),
        togglePlay: jest.fn(),
      };
      wrapper = shallow(<GuideTransport {...spy} />);
    });

    shouldBehaveLikeAComponent(GuideTransport, () => wrapper);

    test('should call its Back callback', () => {
      wrapper.find('.back').simulate('click', eventFuncs);

      expect(spy.back).toHaveBeenCalledTimes(1);
    });
    test('should call its Forward callback', () => {
      wrapper.find('.forward').simulate('click', eventFuncs);

      expect(spy.forward).toHaveBeenCalledTimes(1);
    });
    test('should call its togglePlay callback', () => {
      wrapper.find('.togglePlay').simulate('click', eventFuncs);

      expect(spy.togglePlay).toHaveBeenCalledTimes(1);
    });
  });
});
