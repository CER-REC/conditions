import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';
import BubbleLegend from '.';

describe('Component|InstrumentsLegend/BubbleLegend', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<BubbleLegend className="BubbleLegend" />);
    });

    shouldBehaveLikeAComponent(BubbleLegend, () => wrapper);

    test('should render a formatted message for the title', () => {
      expect(wrapper.find('FormattedMessage')).toHaveLength(1);
    });
  });
});
