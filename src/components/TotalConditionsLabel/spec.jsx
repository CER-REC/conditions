import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import TotalConditionsLabel from '.';

describe('Component|TotalConditionsLabel', () => {
  describe('default', () => {
    const wrapper = shallow(<TotalConditionsLabel />);
    shouldBehaveLikeAComponent(TotalConditionsLabel, () => wrapper);
  });
});
