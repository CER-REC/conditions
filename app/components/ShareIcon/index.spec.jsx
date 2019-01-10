import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ShareIcon from '.';

describe('Components|ShareIcon', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ShareIcon />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a className', () => {
      expect(wrapper.is('.Share-icon')).to.equal((true));
    });
  });
});
