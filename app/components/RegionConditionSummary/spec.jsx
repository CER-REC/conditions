import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';
import RegionConditionSummary from '.';

describe('Component|RegionConditionSummary', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<RegionConditionSummary className="" featureData="themeData" />);
    });

    shouldBehaveLikeAComponent(RegionConditionSummary, () => wrapper);

    test('should render', () => {
      expect(wrapper.type()).toBe('div');
    });
  });
});
