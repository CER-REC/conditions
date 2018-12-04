
import React from 'react';
import { shallow } from 'enzyme';
// import sinon from 'sinon';
import { expect } from 'chai';

import CompanyWheel from './';

describe('Components|CompanyWheel', () => {
  describe('with no props', () => {
    it('should not render anything', () => {
      expect(shallow(<CompanyWheel />).type()).to.equal(null);
    });
  });

  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<CompanyWheel ringType="normal" />);
    });

    it('should render a div', () => {
      expect(wrapper.type()).to.equal('div');
    });
  });

  // IMPLEMENT THE LOCATION TESTS ONCE THEY ARE IMPLEMENTED ON THE DESIGN DOC
});

