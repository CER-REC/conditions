import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import Disclaimer from '.';

describe('Components|DotLegend', () => {
  const wrapper = shallow(<Disclaimer />);
  shouldBehaveLikeAComponent(Disclaimer, () => wrapper);
});
