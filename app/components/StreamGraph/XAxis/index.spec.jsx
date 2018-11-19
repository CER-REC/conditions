import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

import XAxis from './';

describe('Components|X Axis', () => {
  describe('without any data', () => {
    it('should not render anything', () => {
      const wrapper = shallow(<XAxis dateRange={[]} />);
      expect(wrapper.type()).to.equal(null);
    });
  });




});