import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ProjectDot from '.';

describe('Components|Wheel/ProjectDot', () => {
  let wrapper;
  describe('with default props', () => {
    beforeEach(() => {
      wrapper = shallow(<ProjectDot />);
    });

    it('should render a circle as a child', () => {
      expect(wrapper.type()).to.equal('circle');
    });

    it('should have a class ProjectDot always', () => {
      expect(wrapper.hasClass('ProjectDot')).to.equal(true);
    });
  });

  describe('with changing classes', () => {
    it('should have the class IsRelevant when relevant passed in', () => {
      wrapper = shallow(<ProjectDot relevant />);
      expect(wrapper.props().className).to.contain('IsRelevant');
    });

    it('should have the class isFiltered when filtered passed in', () => {
      wrapper = shallow(<ProjectDot filtered />);
      expect(wrapper.props().className).to.contain('IsFiltered');
    });
  });
});
