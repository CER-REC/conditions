import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import LocationWheelMinimap from '.';

const defaultProps = {
  region: 'Lethbridge--Medicine Hat',
};

describe('Components|LocationWheelMinimap', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<LocationWheelMinimap {...defaultProps} />);
    });

    shouldBehaveLikeAComponent(LocationWheelMinimap, () => wrapper);
  });

  it('should not render anything if no region is specified', () => {
    const wrapper = shallow(<LocationWheelMinimap />);
    expect(wrapper.find('.LocationWheelMinimap')).toHaveLength(0);
  });
});
