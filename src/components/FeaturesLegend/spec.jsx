import React from 'react';
import { shallow } from 'enzyme';

import FeaturesLegend from '.';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';
import { displayOrder } from '../../mockData';

const activeEntries = [
  'SECURITY',
  'MANAGEMENT_SYSTEM',
  'FINANCIAL',
  'DAMAGE_PREVENTION',
  'SOCIO_ECONOMIC',
];

describe('Components|FeaturesLegend', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow((
      <FeaturesLegend
        activeEntries={activeEntries}
        selectedFeature="theme"
        isProjectLegend
        displayOrder={displayOrder}
      />
    ));
  });

  shouldBehaveLikeAComponent(FeaturesLegend, () => wrapper);

  test('should contain five active LegendItems', () => {
    const legendItems = wrapper.find('LegendItem');
    expect(legendItems).toHaveLength(13);
    expect(legendItems.filterWhere(v => !v.prop('disabled'))).toHaveLength(5);
  });

  test('should not show the footer when props: isProjectLegend is false', () => {
    wrapper.setProps({ isProjectLegend: false });
    expect(wrapper.hasClass('Footer')).toBe(false);
  });

  describe('without any items', () => {
    test('should not render anything', () => {
      const empty = shallow((
        <FeaturesLegend
          activeEntries={[]}
          selectedFeature="theme"
          isProjectLegend
          displayOrder={displayOrder}
        />
      ));
      expect(empty.type()).toBeNull();
    });
  });
});
