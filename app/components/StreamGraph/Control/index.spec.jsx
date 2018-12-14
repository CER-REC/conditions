import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Control from './';

describe('Components|Control', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Control />);
    });

    it('should not appear unless clicked', () => {
      expect(wrapper.type()).to.equal('div');
    });

    // it('should have a className', () => {
    //   expect(wrapper.is('.control')).to.equal((true));
    // });

    // it('should render a title', () => {
    //   expect(wrapper.find('h1')).to.have.lengthOf(1);
    // });

    // it('should disappear when click happens outside of ', () => {
    //   expect(wrapper.find('VictoryChart')).to.have.lengthOf(1);
    // });
  });
});
