
import React from 'react';
import { shallow } from 'enzyme';
// import sinon from 'sinon';
import { expect } from 'chai';

import CompanyWheel from './';

describe('Components|CompanyWheel', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<CompanyWheel />);
    });

    it('should render a div', () => {
      expect(wrapper.type()).to.equal('div');
    });
  });
});

