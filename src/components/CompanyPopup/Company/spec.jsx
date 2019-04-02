import React from 'react';
import { shouldBehaveLikeAComponent, mountWithIntl } from '../../../tests/utilities';

import Company from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|Company', () => {
  let spy;
  beforeEach(() => {
    spy = {
      closeModal: jest.fn(),
    };
  });

  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mountWithIntl(<Company
        instrument="test"
        CompanyUrl="https://www.example.com"
        {...spy}
      />);
    });

    shouldBehaveLikeAComponent(Company, () => wrapper);

    test('should call its closeModal callback when the Cancel button is clicked', () => {
      wrapper.find('.Company')
        .find('button')
        .simulate('click', eventFuncs);

      expect(spy.closeModal).toHaveBeenCalledTimes(1);
    });
  });
});
