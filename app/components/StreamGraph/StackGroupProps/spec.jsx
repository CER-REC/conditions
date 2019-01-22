import React from 'react';
import { shallow } from 'enzyme';

import StackGroupProps from '.';

const fakeScaleProp = () => 1;
fakeScaleProp.copy = () => {};
fakeScaleProp.domain = () => {};
fakeScaleProp.range = () => {};

const stackProps = {
  domain: { x: [0, 100] },
  scale: { x: fakeScaleProp, y: fakeScaleProp },
  // eslint-disable-next-line object-curly-newline
  padding: { left: 0, right: 0, top: 0, bottom: 0 },
  width: 500,
  height: 300,
};

const groupProps = {
  onChange: () => {},
  projectData: [],
};

describe('Components/Streamgraph/StackGroupProps', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<StackGroupProps
      groupProps={groupProps}
      {...stackProps}
    />);
  });

  test('should hide groupProps from VictoryStack', () => {
    expect(wrapper.props()).not.toHaveProperty('groupProps');
  });

  test('should spread the groupProps to the group', () => {
    const stackGroup = wrapper.prop('groupComponent');
    // This is the inverse of what we pass to StackGroupProps, because it should
    // spread groupProps out and keep the stackProps together
    expect(stackGroup.props).toMatchObject({
      ...groupProps,
      stackProps,
    });
  });
});
