import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ProjectLegend from './';

describe('Components|ProjectLegend', () => {
  describe('with default props', () => {
    // TODO: Change this test to "should render virtualized projects if projectData is empty"
    it('should not render', () => {
      const wrapper = shallow(<ProjectLegend />);
      expect(wrapper.type()).to.equal(null);
    });
  });

  describe('with passed down items', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ProjectLegend items={[]} />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have the Project Legend class', () => {
      expect(wrapper.is('div.ProjectLegend')).to.equal(true);
    });
  });
});
