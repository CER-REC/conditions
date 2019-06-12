import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';
import RegDocsPopup from '../../RegDocsPopup';

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

    beforeEach(() => {
      wrapper = shallow(
        <Content
          {...defaultProps}
        />,
      );
    });

    shouldBehaveLikeAComponent(Content, () => wrapper);

    it('should open RegDocsPopup', () => {
      wrapper.find('.Content')
        .find('ContentBlock').at(1).shallow()
        .find('button')
        .simulate('click', eventFuncs);

      expect(wrapper.find('.Content')
        .find('ContentBlock').at(1).shallow()
        .find(RegDocsPopup)
        .prop('isOpen')).toEqual(true);
    });
  });
});
