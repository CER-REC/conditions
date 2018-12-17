import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Control from './';

// this component will handle arrowKey and drag events

describe('Components|StreamGraph/Control', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Control />);
    });

    it('should have a className', () => {
      expect(wrapper.is('.control')).to.equal((true));
    });
  });
});
