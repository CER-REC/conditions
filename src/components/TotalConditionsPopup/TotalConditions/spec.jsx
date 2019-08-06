import React from 'react';
import { shouldBehaveLikeAComponent, mountWithIntl } from '../../../tests/utilities';

import TotalConditions from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|TotalConditons', () => {
  let spy;
  beforeEach(() => {
    spy = {
      closeModal: jest.fn(),
    };
  });

  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mountWithIntl(<TotalConditions
        {...spy}
      />);
    });

    shouldBehaveLikeAComponent(TotalConditions, () => wrapper);

    test('should call its closeModal callback when the Cancel button is clicked', () => {
      wrapper.find('.TotalConditions')
        .find('button')
        .simulate('click', eventFuncs);

      expect(spy.closeModal).toHaveBeenCalledTimes(1);
    });
  });
});
