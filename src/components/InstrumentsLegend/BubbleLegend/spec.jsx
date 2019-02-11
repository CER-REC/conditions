import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';
import BubbleLegend from '.';

describe('Component|InstrumentsLegend/BubbleLegend', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<BubbleLegend
        className="BubbleLegend"
        maxConditions={1600}
      />);
    });

    shouldBehaveLikeAComponent(BubbleLegend, () => wrapper);
  });
});
