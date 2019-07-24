import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';
import RegionConditionSummary from '.';
import { aggregatedCount, displayOrder } from '../../mockData';

describe('Component|RegionConditionSummary', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow((
        <RegionConditionSummary
          selectedFeature="theme"
          selectedAggregatedCount={aggregatedCount}
          displayOrder={displayOrder}
        />
      ));
    });

    shouldBehaveLikeAComponent(RegionConditionSummary, () => wrapper);

    test('should render a formatted message for the title', () => {
      expect(wrapper.find('FormattedMessage')).toHaveLength(1);
    });
  });
});
