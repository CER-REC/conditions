import React from 'react';
import { shallow } from 'enzyme';

import LegendItem from '.';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

describe('Components|FeaturesLegend/LegendItem', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow((
      <LegendItem color="pink" text="SECURITY" selectedFeature="theme" />
    ));
  });

  shouldBehaveLikeAComponent(LegendItem, () => wrapper);

  describe('When the legend item is disabled', () => {
    const disabled = shallow((
      <LegendItem
        color="green"
        text="SECURITY"
        disabled
        selectedFeature="theme"
      />
    ));

    test('should have a classname of disabled', () => {
      expect(disabled.is('.disabled')).toBe(true);
    });
  });
});
