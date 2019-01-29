import React from 'react';
import { shallow } from 'enzyme';
import { shouldHaveInteractionProps } from '../../tests/utilities';
import CircleContainer from '.';

describe('Component|CircleContainer', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<CircleContainer size={36}>Test</CircleContainer>);
    });

    test('should render', () => {
      expect(wrapper.type()).toBe('div');
    });

    test('should render the children', () => {
      expect(wrapper.text()).toBe('Test');
    });

    test('should have an CircleContainer class', () => {
      expect(wrapper.is('.CircleContainer')).toBe(true);
    });
  });

  describe('Component renders with passed props', () => {
    test('should render the "CircleContainer" and the "elevated" prop', () => {
      const wrapper = shallow(<CircleContainer size={36} elevated>Test</CircleContainer>);
      expect(wrapper.find('.CircleContainer').hasClass('elevated')).toBe(true);
    });

    test('should render the "CircleContainer" class and the "disabled" prop', () => {
      const wrapper = shallow(<CircleContainer size={36} disabled>Test</CircleContainer>);
      expect(wrapper.find('.CircleContainer').hasClass('disabled')).toBe(true);
    });

    test('should accept a size prop with a width and height', () => {
      const wrapper = shallow(<CircleContainer size={36}>Test</CircleContainer>);
      expect(wrapper.props().style.width).toBe(36);
      expect(wrapper.props().style.height).toBe(36);
    });

    test('should check that the prop "onClick" by default doesnt exist', () => {
      const wrapper = shallow(<CircleContainer size={36}>Test</CircleContainer>);
      expect(wrapper.props().onClick).toBeUndefined();
    });

    test('should accept the "onClick" prop and enable click functionality', () => {
      // possibly pass a spy instead of the handle interaction function or noop function
      const wrapper = shallow((
        <CircleContainer
          size={36}
          onClick={() => {}}
        >
          Test
        </CircleContainer>
      ));
      shouldHaveInteractionProps(wrapper);
    });

    test('should accept a className prop from the parent to enhance the style', () => {
      const wrapper = shallow(<CircleContainer size={12} className="searched">Override</CircleContainer>);
      expect(wrapper.find('.CircleContainer').hasClass('searched')).toBe(true);
    });
  });
});
