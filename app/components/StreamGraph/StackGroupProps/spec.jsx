import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import StackGroupProps from '.';

const stackProps = {
  onChange: {},
  controlYear: '',
  ProjectData: {},
};

describe('Components/StackGroupProps', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<StackGroupProps stackProps={stackProps} />);
  });

  it('should pass the props in a group', () => {
    expect(wrapper.props()).to.include({
      stackProps,
    });
  });
});

