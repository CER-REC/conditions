import React from 'react';
import { shallowWithIntl } from '../../../tests/utilities';
import PullToSpin from '.';

const noop = () => {};

describe('Components|Wheel/PullToSpin', () => {
  let wrapper;
  describe('with default props', () => {
    beforeEach(() => {
      wrapper = shallowWithIntl(<PullToSpin onClickSpin={noop} />);
    });

    test('should render an g with className PullToSpin', () => {
      expect(wrapper.type()).toBe('g');
      expect(wrapper.hasClass('PullToSpin')).toBe(true);
    });

    test('should render an arrow, message, and slider', () => {
      expect(wrapper.find('.PullSpinArrow').exists()).toBe(true);
      expect(wrapper.find('.PullMessage').exists()).toBe(true);
      expect(wrapper.find('.PullSlider').exists()).toBe(true);
    });
  });
});
