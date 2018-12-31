import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import LegendItem from '.';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

describe('Components|ProjectLegend/LegendItem', () => {
  const wrapper = shallow((
    <LegendItem color="pink" text="testing" />
  ));

  shouldBehaveLikeAComponent(wrapper, LegendItem, 'LegendItem');

  describe('When the legend item is disabled', () => {
    const disabled = shallow((<LegendItem color="green" text="disabled" disabled />));
    it('should be 30% opaic', () => {
      expect(disabled.is('.Disabled')).to.equal(true);
    });
  });
});
