import React from 'react';
import { expect } from 'chai';
import { shallowWithIntl } from '../../tests/utilities';

import FeatureFlag from '.';

describe('Components|ProjectMenu/ProjectChart/FeatureFlag', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallowWithIntl(<FeatureFlag
        chartType="theme"
        color="purple"
        count={5}
        name="damagePrevention"
      />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a class of FeatureFlag', () => {
      expect(wrapper.is('div.FeatureFlag')).to.equal(true);
    });
  });

  it('should have a FlagTip with more than 11 conditions', () => {
    const wrapper = shallowWithIntl(<FeatureFlag
      chartType="theme"
      color="green"
      count={15}
      name="environmentalProtection"
    />);
    expect(wrapper.find('.FlagTip').type()).to.equal('div');
  });

  it('should NOT have a FlagTip with 10 or less conditions', () => {
    const wrapper = shallowWithIntl(<FeatureFlag
      chartType="theme"
      color="green"
      count={4}
      name="environmentalProtection"
    />);
    expect(wrapper.contains('.FlagTip')).to.equal(false);
  });

  it('should NOT have the flag tip if the condition count is 0', () => {
    const wrapper = shallowWithIntl(<FeatureFlag
      chartType="theme"
      color="green"
      count={0}
      name="environmentalProtection"
    />);
    expect(wrapper.contains('.FlagTip')).to.equal(false);
  });
});
