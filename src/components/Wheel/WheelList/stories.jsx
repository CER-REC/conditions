import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import ReadMe from './README.md';
import WheelList from '.';

const companyList = [
  'CompanyA',
  'CompanyB',
  'CompanyC',
  'CompanyD',
  'CompanyE',
  'CompanyF',
  'CompanyG',
  'CompanyHmoreThan15Characters',
  'CompanyI',
  'CompanyJ',
  'CompanyK',
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
];

const onChange = () => index => ({ selected: index });

storiesForComponent('Components|Wheel/WheelList', module, ReadMe)
  .addDecorator(withInteraction({ actions: ['onChange'] }))
  .addDecorator(withStatus({
    name: 'underReview',
  }))
  .add('with company data', () => (
    <div style={{width: 400, height: 400, border: '1px solid magenta'}}>
      <WheelList
        mode="company"
        companyList={companyList}
        {...getInteractionProps()}
        selected={4}
      />
    </div>
  ), {interaction: { actions: { onChange } } })
  .add('with location data', () => (
    <div style={{width: 400, height: 400, border: '1px solid magenta'}}>
      <WheelList
        mode="location"
        locationList={locationList}
        selected={2}
        {...getInteractionProps()}
      />
    </div>
  ), {interaction: { actions: { onChange } } });
