import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import GreyPipe from '.';

describe('Components|GreyPipe', () => {
  describe('with default props', () => {
    const wrapper = shallow(<GreyPipe mode="company" />);
    shouldBehaveLikeAComponent(GreyPipe, () => wrapper);
  });
});
