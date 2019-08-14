import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import GreyPipe from '.';
import CountBubble from '../CountBubble';

describe('Components|GreyPipe', () => {
  describe('with default props', () => {
    const wrapper = shallow(<GreyPipe mode="company" />);
    shouldBehaveLikeAComponent(GreyPipe, () => wrapper);

    test('should not render any Count Bubbles', () => {
      const bubbles = wrapper.find(CountBubble);
      expect(bubbles).toHaveLength(0);
    });
  });

  describe('with counts', () => {
    const wrapper = shallow(
      <GreyPipe
        mode="company"
        conditionCount={3}
        instrumentCount={2}
        projectCount={1}
      />,
    );

    test('should render three Count Bubbles', () => {
      const bubbles = wrapper.find(CountBubble);
      expect(bubbles).toHaveLength(3);
    });
  });
});
