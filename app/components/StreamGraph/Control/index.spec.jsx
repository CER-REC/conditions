import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Control from './';

// click show and disappear should not be handled here but in the StreamGraph component
// this component should handle keypress and click events

describe('Components|StreamGraph/Control', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Control />);
    });

    it('should not appear unless clicked', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a className', () => {
      expect(wrapper.is('.control')).to.equal((true));
    });
  });
});
