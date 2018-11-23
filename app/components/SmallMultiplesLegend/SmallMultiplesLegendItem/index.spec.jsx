import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import SmallMultiplesLegendItem from './';

describe('Components|SmallMultiplesLegend/SmallMultiplesLegendItem', () => {
  describe('when only the title property is provided', () => {
    let wrapper;
    const title = "Test Title";

    beforeEach(() => {
      wrapper = shallow(<SmallMultiplesLegendItem title={title} />);
    });

    it('should render the title', () => {
      expect(wrapper.text()).to.contain(title);
    });

    it('should not render the graph');
  });

  describe('when only the data property is provided', () => {
    it('should render the graph');
  });
});
