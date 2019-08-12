import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

import Content from '.';

import { conditionData } from '../../../mockData';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

const defaultProps = {
  instrument: conditionData[0],
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

    it('should provide a clickable instrument number', () => {
      wrapper.find('.Content')
        .find('ContentBlock').at(1).shallow()
        .find('button')
        .simulate('click', eventFuncs);

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('with no document', () => {
    const wrapper = shallow(
      <Content
        instrument={conditionData[1]}
        itemIndex={0}
        openIntermediatePopup={noop}
      />,
    );

    it('should not provide a clickable instrument number', () => {
      const button = wrapper.find('.Content')
        .find('ContentBlock').at(1).shallow()
        .find('button');

      expect(button).toHaveLength(0);
    });
  });
});
