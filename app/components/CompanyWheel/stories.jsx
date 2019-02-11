import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import CompanyWheel from '.';
import ReadMe from './README.md';

import { locationWheelData, companyWheelData } from './randomDataSample';

const props = {
  ringType: 'Company',
};

storiesForComponent('Components|CompanyWheel', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({
    state: { selectedRay: '5433ce88-f40d-4e90-84f9-980849a26910' },
    actions: {
      selectRay: () => selectedRay => ({ selectedRay }),
    },
  }))
  .add('default', () => (
    <CompanyWheel
      {...getInteractionProps()}
      {...props}
      itemsData={companyWheelData}
    />
  ))
  .add('location props', () => (
    <CompanyWheel
      {...getInteractionProps()}
      {...props}
      ringType="Location"
      itemsData={locationWheelData}
    />
  ));
