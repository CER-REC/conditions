import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

import WheelList from '.';

const companyList = [
  { name: 'Company A' },
  { name: 'Company B' },
  { name: 'Company C' },
  { name: 'Company D' },
  { name: 'Company E' },
  { name: 'Company F' },
  { name: 'Company G' },
  { name: 'Company H moreThan15Characters' },
  { name: 'Company I' },
  { name: 'Company J' },
  { name: 'Company K' },
  { name: 'Company L' },
  { name: 'Company M' },
];

describe('Components|Wheel/WheelList', () => {
  let wrapper;
  let spy;
  describe('with default props', () => {
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <WheelList
          className="testClass"
          wheelType="company"
          listContent={companyList}
          selected={4}
          onChange={spy}
        />,
      );
    });

    shouldBehaveLikeAComponent(WheelList, () => wrapper);

    it('should pass its onChange callback to the List', () => {
      wrapper.find('.WheelList')
        .find('.listContainer')
        .find('.list')
        .find('List')
        .props()
        // Mock event to keep analytics from breaking the test
        .onChange(2, { type: 'test' });

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should convert from the given relative index to a proper list index', () => {
      wrapper.find('.WheelList')
        .find('.listContainer')
        .find('.list')
        .find('List')
        .props()
        // Mock event to keep analytics from breaking the test
        .onChange(5, { type: 'test' });

      expect(spy).toHaveBeenCalledWith(6);
    });
  });
});
