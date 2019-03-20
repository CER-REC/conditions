import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import Wheel from '.';
import ReadMe from './README.md';

import { companyWheelData as companyData, locationData } from './randomDataSample';

storiesForComponent('Components|Wheel', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({
    state: { selectedRay: '' },
    actions: {
      selectRay: () => selectedRay => ({ selectedRay }),
    },
  }))
  .add('default', () => (
    <div>
      <Wheel
        {...getInteractionProps()}
        wheelType="company"
        itemsData={companyData}
      />
    </div>
  ))
  .add('location props', () => (
    <Wheel
      {...getInteractionProps()}
      wheelType="location"
      itemsData={locationData}
    />
  ));
