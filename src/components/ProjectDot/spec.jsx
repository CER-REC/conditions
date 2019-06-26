import React from 'react';
import { shallow } from 'enzyme';

import ProjectDot from '.';

const defaultProps = {
  cx: 16,
  cy: 16,
  r: 8,
};

describe('Components|ProjectDot', () => {
  let wrapper;
  describe('with default props', () => {
    beforeEach(() => {
      wrapper = shallow(<ProjectDot {...defaultProps} />);
    });

    test('should render a circle as a child', () => {
      expect(wrapper.type()).toBe('circle');
    });

    test('should have a class ProjectDot always', () => {
      expect(wrapper.hasClass('ProjectDot')).toBe(true);
    });
  });

  describe('with changing classes', () => {
    test('should have the class relevant when relevant passed in', () => {
      wrapper = shallow(<ProjectDot relevant {...defaultProps} />);
      expect(wrapper.props().className).toContain('relevant');
    });

    test('should have the class filtered when filtered passed in', () => {
      wrapper = shallow(<ProjectDot filtered {...defaultProps} />);
      expect(wrapper.props().className).toContain('filtered');
    });
  });
});
