import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import ReadMe from './README.md';
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
  'LocationZ',
  'LocationC',
  'LocationD',
  'LocationJ',
  'LocationKmoreThan15Characters',
  'LocationE',
];

storiesForComponent('Components|Wheel/WheelList', module, ReadMe)
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
