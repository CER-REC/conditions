import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ShortCutInfoBar from '.';

describe('Components|ShortCutInfoBar', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ShortCutInfoBar
        onChange={() => {}}
        handleInfoBar={() => {}}
        handleInfoButton={() => {}}
      />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a className', () => {
      expect(wrapper.is('.ShortCutInfoBar')).to.equal((true));
    });

    it('should show eight share icons', () => {
      expect(wrapper.find('ShareIcon')).to.have.lengthOf(8);
    });

    it('should show three text links', () => {
      expect(wrapper.find('button')).to.have.lengthOf(1);
    });
  });
});
