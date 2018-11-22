import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import SmallMultiplesLegendItem from './';

describe('Components|SmallMultiplesLegend/SmallMultiplesLegendItem', () => {
  describe('when the title property is provided', () => {
    let wrapper;
    const title = "Test Title";

    beforeEach(() => {
      wrapper = shallow(<SmallMultiplesLegendItem title={title} />);
    });

    it('should render the title', () => {
      expect(wrapper.text()).to.contain(title);
    });
  });
});
