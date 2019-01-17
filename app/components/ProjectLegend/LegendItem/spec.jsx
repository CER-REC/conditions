import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import LegendItem from '.';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

describe('Components|ProjectLegend/LegendItem', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow((
      <LegendItem color="pink" text="security" selectedFeature="theme" />
    ));
  });

  shouldBehaveLikeAComponent(LegendItem, () => wrapper);

  describe('When the legend item is disabled', () => {
    const disabled = shallow((<LegendItem color="green" text="security" disabled selectedFeature="theme" />));
    it('should have a classname of disabled', () => {
      expect(disabled.is('.disabled')).to.equal(true);
    });
  });
});
