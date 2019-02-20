import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

import Content from '.';

import data from '../testData';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

const defaultProps = {
  instrument: data[0],
  itemIndex: 0,
};

describe('Components|ConditionDetails/Content', () => {
  describe('with default props', () => {
    let wrapper;
    let spy;

    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <Content
          {...defaultProps}
          openIntermediatePopup={spy}
        />,
      );
    });

    shouldBehaveLikeAComponent(Content, () => wrapper);

    xit('should call its openIntermediatePopup callback', () => {
      // Should this be tested at this level? How, without digging into child
      // components?
    });
  });
});
