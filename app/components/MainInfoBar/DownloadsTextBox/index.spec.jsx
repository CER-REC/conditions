import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import DownloadsTextBox from '.';

describe('Components|MainInfoBar/DownloadsTextBox', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<DownloadsTextBox />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a className', () => {
      expect(wrapper.is('.downloads-text-box')).to.equal((true));
    });
  });
});
