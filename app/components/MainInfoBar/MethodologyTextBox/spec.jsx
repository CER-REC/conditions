import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import MethodologyTextBox from '.';

describe('Components|MainInfoBar/MethodologyTextBox', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<MethodologyTextBox />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a className', () => {
      expect(wrapper.is('.MethodologyTextBox')).to.equal((true));
    });
  });
});
