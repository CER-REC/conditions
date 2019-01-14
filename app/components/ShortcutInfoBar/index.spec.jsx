import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ShortCutInfoBar from '.';

describe('Components|ShortCutInfoBar', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ShortCutInfoBar />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a className', () => {
      expect(wrapper.is('.ShortCutInfoBar')).to.equal((true));
    });

    it('should show four share icons', () => {
      expect(wrapper.find('ShareIcon')).to.have.lengthOf(4);
    });

    it('should show three text links', () => {
      expect(wrapper.find('button')).to.have.lengthOf(1);
    });

    it('should expand when given the handleInfoBar prop', () => {
      expect(wrapper.props().handleInfoBar).to.equal(true);
    });
  });
});
