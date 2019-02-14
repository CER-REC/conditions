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
      wrapper = shallow(<PullToSpin onSpinClick={noop} />);
    });

    test('should render an svg with className PullToSpin', () => {
      expect(wrapper.type()).toBe('svg');
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
      wrapper = shallow(<PullToSpin onSpinClick={callback} />);
    });

    test('should trigger the callback function passed in', () => {
      expect(wrapper.state('spinTogglePosition')).toBe('translate(0px, 0px) rotate(0deg)');
      wrapper.find('.PullSlider').simulate('click', eventFuncs);
      shouldHaveInteractionProps(wrapper.find('.PullSlider'));
      expect(wrapper.state('spinTogglePosition')).toBe('translate(56px, -56px) rotate(15deg)');
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the animation is over', () => {
    test('should set the spinTogglePosition back to its original position', () => {
      const instance = wrapper.instance();
      instance.onRestSpin();
      expect(wrapper.state('spinTogglePosition')).toBe('translate(0px, 0px) rotate(0deg)');
    });
  });
});
