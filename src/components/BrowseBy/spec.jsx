import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import BrowseBy from '.';

const noop = () => {};

describe('Components|BrowseBy', () => {
  describe('with default props', () => {
    const wrapper = shallow(<BrowseBy labelId="return" onClick={noop} browseBy="company" />);

    shouldBehaveLikeAComponent(BrowseBy, () => wrapper);
  });
});
