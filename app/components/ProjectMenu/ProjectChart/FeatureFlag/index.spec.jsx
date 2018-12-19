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

  it('should have a FlagTip with more than 11 conditions', () => {
    const wrapper = shallow(<FeatureFlag
      chartType="Theme"
      color="green"
      count={15}
      name="Environmental Protection"
    />);
    expect(wrapper.find('.FlagTip').type()).to.equal('div');
  });

  it('should NOT have a FlagTip with 10 or less conditions', () => {
    const wrapper = shallow(<FeatureFlag
      chartType="Theme"
      color="green"
      count={4}
      name="Environmental Protection"
    />);
    expect(wrapper.contains('.FlagTip')).to.equal(false);
  });

  it('should NOT have the flag tip if the condition count is 0', () => {
    const wrapper = shallow(<FeatureFlag
      chartType="Theme"
      color="green"
      count={0}
      name="Environmental Protection"
    />);
    expect(wrapper.contains('.FlagTip')).to.equal(false);
  });
});
