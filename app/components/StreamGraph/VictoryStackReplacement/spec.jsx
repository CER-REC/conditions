import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import VictoryStackReplacement from '.';

describe('Components/VictoryStackReplacement', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<VictoryStackReplacement stackProps />);
  });

  it('should pass the props in a group', () => {
    expect(wrapper.props().stackProps).to.equal(true);
  });
});

