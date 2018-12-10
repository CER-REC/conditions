import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import WheelRayLegend from './';

describe('Components|CompanyWheel/WheelRayLegend', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<WheelRayLegend />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('g');
    });
  });
});

