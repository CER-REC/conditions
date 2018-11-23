import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import FeatureFlag from './';

describe('Components|FeatureFlag', () => {
  describe('with default props', () => {
    const color = 'Rainbow';
    const count = 5;

    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<FeatureFlag color={color} count={count} />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a class of FeatureFlag', () => {
      expect(wrapper.is('div.FeatureFlag')).to.equal(true);
    });
  });
});
