import React from 'react';
import { shallow } from 'enzyme';

import ProjectDot from '.';

describe('Components|CompanyWheel/ProjectDot', () => {
  let wrapper;
  describe('with default props', () => {
    beforeEach(() => {
      wrapper = shallow(<ProjectDot />);
    });

    test('should render a circle as a child', () => {
      expect(wrapper.type()).toBe('circle');
    });

    test('should have a class ProjectDot always', () => {
      expect(wrapper.hasClass('ProjectDot')).toBe(true);
    });
  });

  describe('with changing classes', () => {
    test('should have the class IsRelevant when relevant passed in', () => {
      wrapper = shallow(<ProjectDot relevant />);
      expect(wrapper.props().className).toContain('IsRelevant');
    });

    test('should have the class isFiltered when filtered passed in', () => {
      wrapper = shallow(<ProjectDot filtered />);
      expect(wrapper.props().className).toContain('IsFiltered');
    });
  });
});
