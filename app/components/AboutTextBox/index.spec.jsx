import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import AboutTextBox from '.';

describe('Components|AboutTextBox', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<AboutTextBox />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a className', () => {
      expect(wrapper.is('.AboutTextBox')).to.equal((true));
    });
  });
});
