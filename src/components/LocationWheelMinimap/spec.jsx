import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import LocationWheelMinimap from '.';

describe('Components|LocationWheelMinimap', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<LocationWheelMinimap />);
    });

    test('should render', () => {
      expect(wrapper.type()).toBe('div');
    });

    shouldBehaveLikeAComponent(LocationWheelMinimap, () => wrapper);
  });
});
