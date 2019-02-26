import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import data from './testData';
import ConditionDetails from '.';

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

    test('should pass its openProjectDetails callback to the ProjectHeader component', () => {
      wrapper.find('.ConditionDetails')
        .find('.main')
        .find('ProjectHeader')
        .props()
        .openProjectDetails('test');

      expect(spy.openProjectDetails).toHaveBeenCalledTimes(1);
    });

    test('should pass its openIntermediatePopup callback to the Content component', () => {
      wrapper.find('.ConditionDetails')
        .find('.main')
        .find('Content')
        .props()
        .openIntermediatePopup();

      expect(spy.openIntermediatePopup).toHaveBeenCalledTimes(1);
    });

    test('should call its toggleExpanded callback', () => {
      wrapper.find('.ConditionDetails')
        .find('.main')
        .find('ProjectHeader')
        .props()
        .toggleExpanded(true);

      expect(spy.toggleExpanded).toHaveBeenCalledTimes(1);
    });
  });
});
