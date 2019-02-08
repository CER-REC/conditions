import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import LocationWheelMinimap from '.';

const defaultProps = {
  province: 'Alberta',
  region: 'Lethbridge--Medicine Hat',
};

describe('Components|LocationWheelMinimap', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<LocationWheelMinimap {...defaultProps} />);
    });

    test('should render', () => {
      expect(wrapper.type()).toBe('div');
    });

    shouldBehaveLikeAComponent(LocationWheelMinimap, () => wrapper);
  });
});
