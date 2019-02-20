import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import data from './testData';
import ConditionDetails from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

const defaultProps = {
  data,
  selectedProject: 'Keystone XL',
  searchKeywords: {
    include: ['hello'],
  },
  selectedItem: { instrumentIndex: 1, itemIndex: -1 },
};

describe('Components|ConditionDetails', () => {
  describe('with default props', () => {
    let wrapper;
    let spy;

    beforeEach(() => {
      spy = {
        openProjectDetails: jest.fn(),
        openIntermediatePopup: jest.fn(),
        toggleExpanded: jest.fn(),
        updateSelectedItem: jest.fn(),
      };

      wrapper = shallow(
        <ConditionDetails
          {...defaultProps}
          isExpandable
          {...spy}
        />,
      );
    });

    shouldBehaveLikeAComponent(ConditionDetails, () => wrapper);

    //
    // Is testing at the subcomponent level sufficient for these, or should
    // they be tested here as well?
    //

    xtest('should call its openProjectDetails callback', () => {
      wrapper.find('.ConditionDetails')
        .find('.header')
        .find('.openProject')
        .simulate('click', eventFuncs);

      expect(spy.openProjectDetails).toHaveBeenCalledTimes(1);
    });

    xtest('should call its openIntermediatePopup callback', () => {
      wrapper.find('.ConditionDetails')
        .find('.content')
        .find('.instrumentLink')
        .simulate('click', eventFuncs);

      expect(spy.openIntermediatePopup).toHaveBeenCalledTimes(1);
    });

    xtest('should call its toggleExpanded callback', () => {
      wrapper.find('.ConditionDetails')
        .find('.header')
        .find('.toggleExpand')
        .simulate('click', eventFuncs);

      expect(spy.toggleExpanded).toHaveBeenCalledTimes(1);
    });
  });
});
