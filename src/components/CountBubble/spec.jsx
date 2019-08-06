import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import CountBubble from '.';

describe('Components|CountBubble', () => {
  describe('with default props', () => {
    const wrapper = shallow(<CountBubble count={42} textId="projects" />);
    shouldBehaveLikeAComponent(CountBubble, () => wrapper);
  });
});
