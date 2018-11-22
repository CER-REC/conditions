import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ProjectChart from './';

describe('Components|ProjectChart', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ProjectChart />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a ProjectChart class', () => {
      expect(wrapper.is('div.ProjectChart')).to.equal(true);
    });
  });
});
