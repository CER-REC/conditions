import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import FeaturesLegend from '.';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

const legendItems = [
  { color: 'pink', description: 'security', disabled: true },
  { color: 'red', description: 'managementSystem', disabled: false },
  { color: 'green', description: 'financial', disabled: false },
  { color: 'blue', description: 'damagePrevention', disabled: false },
  { color: 'purple', description: 'socioEconomic', disabled: false },
];

describe('Components|FeaturesLegend', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow((
      <FeaturesLegend legendItems={legendItems} selectedFeature="theme" isProjectLegend />
    ));
  });

  shouldBehaveLikeAComponent(FeaturesLegend, () => wrapper);

  it('should contain five LegendItems', () => {
    expect(wrapper.find('LegendItem')).to.have.lengthOf(5);
  });

  it('should not show the footer when props: isProjectLegend is false', () => {
    wrapper.setProps({ isProjectLegend: false });
    expect(wrapper.hasClass('Footer')).to.equal(false);
  });

  describe('without any items', () => {
    it('should not render anything', () => {
      const empty = shallow(<FeaturesLegend legendItems={[]} selectedFeature="theme" isProjectLegend />);
      expect(empty.type()).to.equal(null);
    });
  });
});
