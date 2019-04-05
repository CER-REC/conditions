import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import BrowseBy from '.';

describe('Components|BrowseBy', () => {
  describe('with default props', () => {
    const wrapper = shallow(<BrowseBy />);

    shouldBehaveLikeAComponent(BrowseBy, () => wrapper);
  });
});
