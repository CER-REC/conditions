import React from 'react';
import { shallow } from 'enzyme';

import WheelList from '.';

const companyList = [
  'CompanyA',
  'CompanyB',
  'CompanyC',
  'CompanyD',
  'CompanyE',
  'CompanyF',
  'CompanyG',
  'CompanyH',
  'CompanyI',
  'CompanyJ',
  'CompanyKmoreThan15Characters',
  'CompanyL',
  'CompanyM',
];

const locationList = [
  'LocationA',
  'LocationB',
  'LocationC',
  'LocationD',
  'LocationE',
  'LocationF',
  'LocationG',
  'LocationH',
  'LocationI',
  'LocationJ',
  'LocationKmoreThan15Characters',
  'LocationL',
  'LocationM',
  'LocationN',
  'LocationO',
  'LocationP',
];

describe('Components|Wheel/WheelList', () => {
  let wrapper;
  describe('with default props', () => {
    beforeEach(() => {
      wrapper = shallow(
        <WheelList
          mode="company"
          className="WheelList"
          companyList={companyList}
          locationList={locationList}
        />,
      );
    });

    test('should render a formatted message for the selection', () => {
      expect(wrapper.find('FormattedMessage')).toHaveLength(1);
    });
  });
});
