import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import DotLegend from '.';

describe('Components|DotLegend', () => {
  const wrapper = shallow(<DotLegend />);
  shouldBehaveLikeAComponent(DotLegend, () => wrapper);
});
