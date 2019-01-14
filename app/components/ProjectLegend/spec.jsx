import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ProjectLegend from '.';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

const legendItems = [
  { color: 'pink', description: 'security', disabled: true },
  { color: 'red', description: 'managementSystem', disabled: false },
  { color: 'green', description: 'financial', disabled: false },
  { color: 'blue', description: 'damagePrevention', disabled: false },
  { color: 'purple', description: 'socioEconomic', disabled: false },
];

describe('Components|ProjectLegend', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow((
      <ProjectLegend legendItems={legendItems} selectedFeature="theme" />
    ));
  });

  shouldBehaveLikeAComponent(ProjectLegend, () => wrapper);

  it('should contain five LegendItems', () => {
    expect(wrapper.find('LegendItem')).to.have.lengthOf(5);
  });

  describe('without any items', () => {
    it('should not render anything', () => {
      const empty = shallow(<ProjectLegend legendItems={[]} selectedFeature="theme" />);
      expect(empty.type()).to.equal(null);
    });
  });
});
