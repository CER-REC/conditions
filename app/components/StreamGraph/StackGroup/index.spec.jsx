import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import StackGroup from '.';

describe('Components|Streamgraph/StackGroup', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<StackGroup />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal(('g'));
    });
  });
});
