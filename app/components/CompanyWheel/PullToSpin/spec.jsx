import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { shouldHaveInteractionProps } from '../../../tests/utilities';
import PullToSpin from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|CompanyWheel/PullToSpin', () => {
  let wrapper;
  describe('with default props', () => {
    beforeEach(() => {
      wrapper = shallow(<PullToSpin onSpinClick={noop} />);
    });

    it('should render an svg with className PullToSpin', () => {
      expect(wrapper.type()).to.equal('svg');
      expect(wrapper.hasClass('PullToSpin')).to.equal(true);
    });

    it('should render an arrow, message, and slider', () => {
      expect(wrapper.find('.PullSpinArrow').exists()).to.equal(true);
      expect(wrapper.find('.PullMessage').exists()).to.equal(true);
      expect(wrapper.find('.PullSlider').exists()).to.equal(true);
    });
  });

  describe('when the slider is clicked', () => {
    let callback;
    beforeEach(() => {
      callback = sinon.spy();
      wrapper = shallow(<PullToSpin onSpinClick={callback} />);
    });

    it('should trigger the callback function passed in', () => {
      expect(wrapper.state('spinTogglePosition')).to.equal('translate(0px, 0px) rotate(0deg)');
      wrapper.find('.PullSlider').simulate('click', eventFuncs);
      shouldHaveInteractionProps(wrapper.find('.PullSlider'));
      expect(wrapper.state('spinTogglePosition')).to.equal('translate(56px, -56px) rotate(15deg)');
      expect(callback).to.have.property('callCount', 1);
    });
  });

  describe('when the animation is over', () => {
    it('should set the spinTogglePosition back to its original position', () => {
      const instance = wrapper.instance();
      instance.onRestSpin();
      expect(wrapper.state('spinTogglePosition')).to.equal('translate(0px, 0px) rotate(0deg)');
    });
  });
});
