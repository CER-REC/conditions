import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ShortcutInfoBar from '.';

describe('Components|ShortcutInfoBar', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ShortcutInfoBar
        onChange={() => {}}
        handleInfoBar={() => {}}
        handleInfoButton={() => {}}
      />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a className', () => {
      expect(wrapper.is('.ShortcutInfoBar')).to.equal((true));
    });

    it('should show five share icons', () => {
      expect(wrapper.find('ShareIcon')).to.have.lengthOf(5);
    });

    it('should show three text links', () => {
      expect(wrapper.find('button')).to.have.lengthOf(1);
    });
  });
});
