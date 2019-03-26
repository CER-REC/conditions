import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import SkipIntro from '.';

describe('Components|SkipIntro', () => {
  describe('with default props', () => {
    const wrapper = shallow(<SkipIntro />);

    shouldBehaveLikeAComponent(SkipIntro, () => wrapper);
  });
});
