import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import Arrow from '.';

describe('Component|Arrow', () => {
  describe('with default props', () => {
    const wrapper = shallow(<Arrow orientation="Up" />);
    shouldBehaveLikeAComponent(Arrow, () => wrapper);
  });
});
