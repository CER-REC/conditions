import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import XAxis from './';

describe('Components|X Axis', () => {
  describe('without any data', () => {
    it('should not render anything', () => {
      const wrapper = shallow(<XAxis dateRange={[]} />);
      expect(wrapper.type()).to.equal(null);
    });
  });

  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<XAxis dateRange={[2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]} />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a label title', () => {
      expect(wrapper.find('label')).to.have.lengthOf(1);
    });

    

    describe('with styles', () => {
      it('should have a className', () => {
        expect(wrapper.find('div.x-axis')).to.have.lengthOf(1);
      });
    });
  });
});
