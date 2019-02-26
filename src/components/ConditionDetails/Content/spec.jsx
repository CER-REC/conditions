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

    it('should call its openIntermediatePopup callback', () => {
      wrapper.find('.Content')
        .find('ContentBlock').at(1).shallow()
        .find('button')
        .simulate('click', eventFuncs);

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
