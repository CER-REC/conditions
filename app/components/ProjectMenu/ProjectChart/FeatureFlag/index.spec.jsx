import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import FeatureFlag from './';

describe('Components|ProjectMenu/ProjectChart/FeatureFlag', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<FeatureFlag
        chartType="Theme"
        color="purple"
        count={5}
        name="Damage Prevention"
      />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a class of FeatureFlag', () => {
      expect(wrapper.is('div.FeatureFlag')).to.equal(true);
    });
  });

  describe('with 10 or more conditions', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<FeatureFlag
        chartType="Theme"
        color="green"
        count={15}
        name="Environmental Protection"
      />);
    });
    it('should have a FlagTip', () => {
      expect(wrapper.find('.FlagTip').type()).to.equal('div');
    });
  });
});
