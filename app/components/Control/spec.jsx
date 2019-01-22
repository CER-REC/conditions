import React from 'react';
import { shallow } from 'enzyme';

import Control from '.';

const positionControl = 'translate(30, 30)';
const numOfConditionsLabel = 213;
const yHeight = '0';

describe('Components|Control', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Control
        positionControl={positionControl}
        numOfConditionsLabel={numOfConditionsLabel}
        yHeight={yHeight}
      />);
    });

    test('should render', () => {
      expect(wrapper.type()).toBe('g');
    });
  });
});
