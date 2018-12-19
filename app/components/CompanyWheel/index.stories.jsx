import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import CompanyWheel from './';
import ReadMe from './README.md';

import { locationWheelData, companyWheelData } from './randomDataSample';

const props = {
  ringType: 'Company',
};


storiesForComponent('Components|CompanyWheel', module, ReadMe)
  .add('default', () => (
    <div>
      <CompanyWheel {...props} itemsData={companyWheelData} />
    </div>
  ))
  .add('location props', () => (
    <CompanyWheel
      {...props}
      ringType="Location"
      itemsData={locationWheelData}
    />
  ));
