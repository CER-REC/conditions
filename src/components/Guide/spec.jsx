import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import Guide from '.';

const noop = () => {};

describe('Components|Guide', () => {
  describe('with default props', () => {
    const wrapper = shallow(<Guide step={3} onClick={noop} />);

    shouldBehaveLikeAComponent(Guide, () => wrapper);
  });
});
