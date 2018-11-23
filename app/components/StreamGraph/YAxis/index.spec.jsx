import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import YAxis from './';

describe('Components|Y Axis', () => {
  describe('without any data', () => {
    it('should not render anything', () => {
      const wrapper = shallow(<YAxis dateRange={[]} />);
      expect(wrapper.type()).to.equal(null);
    });
  });

  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<YAxis dateRange={[2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]} />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    describe('with styles', () => {
      it('should have a className', () => {
        expect(wrapper.find('div.y-axis')).to.have.lengthOf(1);
      });
    });
  });
});
