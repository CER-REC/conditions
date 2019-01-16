import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import FeaturesLegend from '.';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

const legendItems = [
  { color: 'pink', description: 'test 1', disabled: true },
  { color: 'red', description: 'test 2', disabled: false },
  { color: 'green', description: 'test 3', disabled: false },
  { color: 'blue', description: 'test 4', disabled: false },
  { color: 'purple', description: 'test 5', disabled: false },
];

describe('Components|FeaturesLegend', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow((
      <FeaturesLegend legendItems={legendItems} />
    ));
  });

  shouldBehaveLikeAComponent(FeaturesLegend, () => wrapper);

  it('should contain five LegendItems', () => {
    expect(wrapper.find('LegendItem')).to.have.lengthOf(5);
  });

  describe('without any items', () => {
    it('should not render anything', () => {
      const empty = shallow(<FeaturesLegend legendItems={[]} />);
      expect(empty.type()).to.equal(null);
    });
  });
});
