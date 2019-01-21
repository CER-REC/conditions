import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Wheel from '.';

describe('Components|Wheel', () => {
  describe('with no props', () => {
    it('should render a company wheel', () => {
      expect(shallow(<Wheel />).type()).to.equal('div');
    });

    // it('should have the prop company by default', () => {
    //   expect(shallow(<CompanyWheel />).prop('ringType')).to.equal('company');
    // });
  });
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Wheel ringType="normal" />);
    });

    it('should render a div', () => {
      expect(wrapper.type()).to.equal('div');
    });
  });

  // IMPLEMENT THE LOCATION TESTS ONCE THEY ARE IMPLEMENTED ON THE DESIGN DOC
});

