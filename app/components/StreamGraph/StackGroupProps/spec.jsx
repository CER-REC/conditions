import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import StackGroupProps from '.';

const stackProps = {
  domain: { x: () => {} },
  width: 500,
  height: 300,
};

const groupProps = {
  onChange: () => {},
  ProjectData: [],
};

describe('Components/Streamgraph/StackGroupProps', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<StackGroupProps
      groupProps={groupProps}
      {...stackProps}
    />);
  });

  it('should pass the props in a group', () => {
    expect(wrapper.props()).to.include({
      stackProps,
    });
  });

  it('should pass the groupProps properly', () => {});
});

