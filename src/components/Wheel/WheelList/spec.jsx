import React from 'react';
import { shallow } from 'enzyme';

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

const locationList = [
  'LocationG',
  'LocationH',
  'LocationI',
  'LocationF',
  'LocationO',
  'LocationP',
  'LocationA',
  'LocationB',
  'LocationL',
  'LocationM',
  'Location',
  'LocationC',
  'LocationD',
  'LocationJ',
  'LocationKmoreThan15Characters',
  'LocationE',
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
