import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
// import ReadMe from './README.md';
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

storiesForComponent('Components|Wheel/WheelList', module)
  .addDecorator(withInteraction({ actions: ['onChange'] }))
  .addDecorator(withStatus({
    name: 'underReview',
  }))
  .add('with company data', () => (
    <WheelList
      mode="company"
      companyList={companyList}
      {...getInteractionProps()}
      selected={4}
    />
  ))
  .add('with location data', () => (
    <WheelList
      mode="location"
      locationList={locationList}
      selected={2}
      {...getInteractionProps()}
    />
  ));
