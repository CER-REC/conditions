import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

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
      wrapper = shallow(<RegDocs
        instrument="test"
        regdocsUrl="https://www.example.com"
        {...spy}
      />);
    });

    shouldBehaveLikeAComponent(RegDocs, () => wrapper);

    // test('should pass its setPane callback to the heading buttons', () => {
    //   wrapper.find('.MainInfoBar')
    //     .find('.textButton')
    //     .first()
    //     .simulate('click', eventFuncs);

    //   expect(spy.setPane).toHaveBeenCalledWith('about');
    // });
  });
});
