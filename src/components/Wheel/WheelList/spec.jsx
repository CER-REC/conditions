import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

import WheelList from '.';

const companyList = [
  'CompanyA',
  'CompanyG',
  'CompanyH',
  'CompanyI',
  'CompanyB',
  'CompanyF',
  'CompanyJ',
  'CompanyKmoreThan15Characters',
  'CompanyL',
  'CompanyC',
  'CompanyD',
  'CompanyE',
  'CompanyM',
];

describe('Components|Wheel/WheelList', () => {
  let wrapper;
  let spy;
  describe('with default props', () => {
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <WheelList
          className="WheelList"
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
