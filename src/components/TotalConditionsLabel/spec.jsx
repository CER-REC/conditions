import React from 'react';
import { shallowWithIntl, shouldBehaveLikeAComponent } from '../../tests/utilities';

import TotalConditionsLabel from '.';

describe('Component|TotalConditionsLabel', () => {
  describe('default', () => {
    const wrapper = shallowWithIntl(<TotalConditionsLabel />);
    shouldBehaveLikeAComponent(TotalConditionsLabel, () => wrapper);
  });
});
