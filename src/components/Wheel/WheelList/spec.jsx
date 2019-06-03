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
        .onChange();

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
