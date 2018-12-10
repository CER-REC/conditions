import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import CompanyWheel from './';
import ReadMe from './README.md';

import { locationWheelData, companyWheelData } from './randomDataSample';

const rotation = 90;

const props = {
  ringType: 'normal',
  rotation,
};

storiesForComponent('Components|CompanyWheel', module, ReadMe)
  .add('default', () => (
    <CompanyWheel {...props} itemsData={companyWheelData} />
  ))
  .add('location props', () => (
    <CompanyWheel {...props} itemsData={locationWheelData} />
  ));
