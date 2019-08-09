import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';
import RegionConditions from '.';
import { aggregatedCount, displayOrder } from '../../../mockData';

describe('Component|RegionSummary/RegionConditions', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow((
        <RegionConditions
          selectedFeature="theme"
          selectedAggregatedCount={aggregatedCount}
          displayOrder={displayOrder}
        />
      ));
    });

    shouldBehaveLikeAComponent(RegionConditions, () => wrapper);

    test('should render a formatted message for the title', () => {
      expect(wrapper.find('FormattedMessage')).toHaveLength(1);
    });
  });
});
