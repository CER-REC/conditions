import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Legend from './';

describe('Components|ProjectMenu/Legend', () => {
  describe('with passed down items', () => {
    const legendData = [
      { name: 'Standard Condition', color: 'brown' },
      { name: 'Integrity Management', color: 'pink' },
      { name: 'Environmental Protection', color: 'green' },
      { name: 'Administrative', color: 'limegreen' },
      { name: 'Sunset Clause', color: 'blue' },
      { name: 'Enforcement', color: 'lightblue' },
      { name: 'Emergency Management', color: 'teal' },
      { name: 'Socio-Economic', color: 'lavender' },
      { name: 'Safety Management', color: 'midnightblue' },
      { name: 'Damage Prevention', color: 'purple' },
      { name: 'Financial', color: 'moccasin' },
      { name: 'Security', color: 'tomato' },
      { name: 'Management System', color: 'forestgreen' },
      { name: 'No Theme Indicated', color: 'black' },
    ];
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Legend items={legendData} />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a class of Legend', () => {
      expect(wrapper.is('div.Legend')).to.equal(true);
    });
  });
});
