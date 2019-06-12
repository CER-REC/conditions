import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import { conditionData } from '../../mockData';
import ConditionDetails from '.';

const defaultProps = {
  data: conditionData,
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
