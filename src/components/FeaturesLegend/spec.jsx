import React from 'react';
import { shallow } from 'enzyme';

import FeaturesLegend from '.';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

const legendItems = [
  { description: 'SECURITY', disabled: true },
  { description: 'MANAGEMENT_SYSTEM', disabled: false },
  { description: 'FINANCIAL', disabled: false },
  { description: 'DAMAGE_PREVENTION', disabled: false },
  { description: 'SOCIO_ECONOMIC', disabled: false },
];

describe('Components|FeaturesLegend', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow((
      <FeaturesLegend legendItems={legendItems} selectedFeature="theme" isProjectLegend />
    ));
  });

  shouldBehaveLikeAComponent(FeaturesLegend, () => wrapper);

  test('should contain five LegendItems', () => {
    expect(wrapper.find('LegendItem')).toHaveLength(5);
  });

  test('should not show the footer when props: isProjectLegend is false', () => {
    wrapper.setProps({ isProjectLegend: false });
    expect(wrapper.hasClass('Footer')).toBe(false);
  });

  describe('without any items', () => {
    test('should not render anything', () => {
      const empty = shallow(<FeaturesLegend legendItems={[]} selectedFeature="theme" isProjectLegend />);
      expect(empty.type()).toBeNull();
    });
  });
});
