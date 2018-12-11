import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import FeatureFlag from './';

describe('Components|ProjectMenu/ProjectChart/FeatureFlag', () => {
  describe('with default props', () => {
    const color = 'Rainbow';
    const count = 5;
    const chartType = 'Theme';
    const name = 'Damage Prevention';

    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<FeatureFlag
        chartType={chartType}
        color={color}
        count={count}
        name={name}
      />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a class of FeatureFlag', () => {
      expect(wrapper.is('div.FeatureFlag')).to.equal(true);
    });
  });
});
