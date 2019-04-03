import React from 'react';
import { shallow } from 'enzyme';
import { shouldHaveInteractionProps } from '../../../tests/utilities';
import PullToSpin from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|Wheel/PullToSpin', () => {
  let wrapper;
  describe('with default props', () => {
    beforeEach(() => {
      wrapper = shallow(<PullToSpin onClickSpin={noop} />);
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

  describe('when the slider is clicked', () => {
    let callback;
    beforeEach(() => {
      callback = jest.fn();
      wrapper = shallow(<PullToSpin onClickSpin={callback} />);
    });

    test('should trigger the callback function passed in', () => {
      shouldHaveInteractionProps(wrapper.find('.PullSlider'));
      wrapper.find('.PullSlider').simulate('click', eventFuncs);
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});
