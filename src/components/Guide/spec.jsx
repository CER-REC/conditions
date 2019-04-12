import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import Guide from '.';

describe('Components|Guide', () => {
  describe('with default props', () => {
    const wrapper = shallow(<Guide textState={3} />);

    shouldBehaveLikeAComponent(Guide, () => wrapper);
  });
});
