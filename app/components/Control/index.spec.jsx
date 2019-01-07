import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Control from '.';

const positionControl = 'translate(30, 30)';
const numOfConditionsLabel = 213;
const yHeight = '0';
const controlTopBaseline = '30';

describe('Components|Control', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Control
        positionControl={positionControl}
        numOfConditionsLabel={numOfConditionsLabel}
        yHeight={yHeight}
        controlTopBaseline={controlTopBaseline}
      />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal(('g'));
    });
  });
});
