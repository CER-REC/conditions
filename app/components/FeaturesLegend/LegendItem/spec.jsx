import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import LegendItem from '.';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

describe('Components|FeaturesLegend/LegendItem', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow((
      <LegendItem color="pink" text="testing" />
    ));
  });

  shouldBehaveLikeAComponent(LegendItem, () => wrapper);

  describe('When the legend item is disabled', () => {
    const disabled = shallow((<LegendItem color="green" text="disabled" disabled />));
    it('should have a classname of Disabled', () => {
      expect(disabled.is('.Disabled')).to.equal(true);
    });
  });
});
