import React from 'react';
import { shouldBehaveLikeAComponent, mountWithIntl } from '../../../tests/utilities';

import Company from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|Company', () => {
  let spy;
  beforeEach(() => {
    spy = jest.fn();
  });

  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mountWithIntl(<Company
        projectName="Trans Mountain Expansion"
        companies={['A', 'B', 'C']}
        closeModal={spy}
      />);
    });

    shouldBehaveLikeAComponent(Company, () => wrapper);

    test('should call its closeModal callback when the Back button is clicked', () => {
      wrapper.find('.Company')
        .find('button')
        .simulate('click', eventFuncs);

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
