import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

import AboutTextBox from '.';

describe('Components|AboutTextBox', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<AboutTextBox />);
    });

    shouldBehaveLikeAComponent(AboutTextBox, () => wrapper);
  });
});
