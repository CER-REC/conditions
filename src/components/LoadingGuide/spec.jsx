import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import LoadingGuide from '.';

describe('Components|LoadingGuide', () => {
  describe('with default props', () => {
    const wrapper = shallow(<LoadingGuide />);

    shouldBehaveLikeAComponent(LoadingGuide, () => wrapper);
  });
});
