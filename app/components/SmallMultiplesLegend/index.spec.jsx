import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import SmallMultiplesLegend from './';

describe('Components|SmallMultiplesLegend', () => {
  let wrapper;
  const title = 'Test Title';

  beforeEach(() => {
    wrapper = shallow(<SmallMultiplesLegend title={title} />);
  });

  it('should render the title', () => {
    expect(wrapper.text()).to.contain(title);
  });
});
