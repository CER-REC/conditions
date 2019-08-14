import React from 'react';
import { shallow } from 'enzyme';

import FeaturesLegend from '.';
import LegendItem from './LegendItem';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';
import { displayOrder, aggregatedCount } from '../../mockData';

describe('Components|FeaturesLegend', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow((
      <FeaturesLegend
        selectedAggregatedCount={aggregatedCount}
        selectedFeature="theme"
        isProjectLegend
        displayOrder={displayOrder}
      />
    ));
  });

  shouldBehaveLikeAComponent(FeaturesLegend, () => wrapper);

  test('should contain five active LegendItems', () => {
    const legendItems = wrapper.find(LegendItem);
    expect(legendItems).toHaveLength(13);
    expect(legendItems.filterWhere(v => !v.prop('disabled'))).toHaveLength(10);
  });

  test('should not show the footer when props: isProjectLegend is false', () => {
    wrapper.setProps({ isProjectLegend: false });
    expect(wrapper.hasClass('Footer')).toBe(false);
  });

  describe('without any items', () => {
    test('should not render anything', () => {
      const empty = shallow((
        <FeaturesLegend
          selectedFeature="theme"
          isProjectLegend
          displayOrder={displayOrder}
        />
      ));
      expect(empty.type()).toBeNull();
    });
  });
});
