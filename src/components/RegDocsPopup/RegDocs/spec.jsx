import React from 'react';
import { shouldBehaveLikeAComponent, mountWithIntl } from '../../../tests/utilities';

import RegDocs from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|RegDocs', () => {
  let spy;
  beforeEach(() => {
    spy = {
      closeModal: jest.fn(),
    };
  });

  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mountWithIntl(<RegDocs
        document="MO-025-2011"
        counts={{ conditions: 8, instruments: 2 }}
        {...spy}
      />);
    });

    shouldBehaveLikeAComponent(RegDocs, () => wrapper);

    test('should call its closeModal callback when the Cancel button is clicked', () => {
      wrapper.find('.RegDocs')
        .find('button')
        .simulate('click', eventFuncs);

      expect(spy.closeModal).toHaveBeenCalledTimes(1);
    });
  });
});
