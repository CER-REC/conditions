import React from 'react';
import { shallowWithIntl } from '../../tests/utilities';

import TotalConditionsLabel from '.';

describe('Component|TotalConditionsLabel', () => {
  describe('default', () => {
    const wrapper = shallowWithIntl(<TotalConditionsLabel className="test" />);
    test('should render', () => {
      expect(wrapper.type()).toBe('div');
    });
  });
});
