import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import StackGroupProps from '.';

describe('Components/StackGroupProps', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<StackGroupProps stackProps />);
  });

  it('should pass the props in a group', () => {
    expect(wrapper.props().stackProps).to.equal(true);
  });
});

