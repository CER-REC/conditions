import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import handleInteraction from '../../utilities/handleInteraction';
import CircleContainer from '.';

describe('Component|CircleContainer', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<CircleContainer size="36px">Test</CircleContainer>);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should render the children', () => {
      expect(wrapper.text()).to.equal('Test');
    });

    it('should have an CircleContainer class', () => {
      expect(wrapper.is('.CircleContainer')).to.equal(true);
    });
  });

  describe('Component renders with passed props', () => {
    it('should render the "CircleContainer" and the "elevated" prop', () => {
      const wrapper = shallow(<CircleContainer size="36px" elevated>Test</CircleContainer>);
      expect(wrapper.find('.CircleContainer').hasClass('elevated')).to.equal(true);
    });

    it('should render the "CircleContainer" class and the "disabled" prop', () => {
      const wrapper = shallow(<CircleContainer size="36px" disabled>Test</CircleContainer>);
      expect(wrapper.find('.CircleContainer').hasClass('disabled')).to.equal(true);
    });

    it('should accept a size prop with a width and height', () => {
      const wrapper = shallow(<CircleContainer size="36px">Test</CircleContainer>);
      expect(wrapper.props().style.width).to.equal('36px');
      expect(wrapper.props().style.height).to.equal('36px');
    });

    it('should check that the prop "onClick" by default doesnt exist', () => {
      const wrapper = shallow(<CircleContainer size="36px">Test</CircleContainer>);
      expect(wrapper.props().onClick).to.equal(undefined);
    });

    it('should accept the "onClick" prop and enable click functionality', () => {
      // possibly pass a spy instead of the handle interaction function or noop function
      const wrapper = shallow(<CircleContainer size="36px" onClick={handleInteraction}>Test</CircleContainer>);
      expect(wrapper.props().onClick).to.be.a('function');
      expect(wrapper.props().onKeyPress).to.be.a('function');
      expect(wrapper.props().tabIndex).to.equal(0);
      expect(wrapper.props().focusable).to.equal(true);
    });

    it('should accept a className prop from the parent to enhance the style', () => {
      const wrapper = shallow(<CircleContainer size="12" className="searched">Override</CircleContainer>);
      expect(wrapper.find('.CircleContainer').hasClass('searched')).to.equal(true);
    });
  });
});

