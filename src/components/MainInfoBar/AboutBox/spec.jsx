import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

import AboutBox from '.';

describe('Components|AboutBox', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<AboutBox />);
    });

    shouldBehaveLikeAComponent(AboutBox, () => wrapper);
  });
});
