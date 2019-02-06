import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import Wheel from '.';
import ReadMe from './README.md';

import { locationWheelData, companyWheelData } from './randomDataSample';

const props = {
  ringType: 'Company',
};

storiesForComponent('Components|Wheel', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('default: company', () => (
    <div>
      <Wheel {...props} itemsData={companyWheelData} />
    </div>
  ))
  .add('location props', () => (
    <Wheel
      {...props}
      ringType="Location"
      itemsData={locationWheelData}
    />
  ));
