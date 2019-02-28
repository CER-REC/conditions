import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import Wheel from '.';
import ReadMe from './README.md';

import { companyWheelData as wheelData } from './randomDataSample';

const props = {
  wheelType: 'Company',
};

storiesForComponent('Components|Wheel', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({
    // state: { selectedRay: '5175c45d-b707-4fe6-8591-0f20ae479288' },
    state: { selectedRay: '' },
    actions: {
      selectRay: () => selectedRay => ({ selectedRay }),
    },
  }))
  .add('default', () => (
    <div>
      <Wheel
        {...getInteractionProps()}
        {...props}
        itemsData={wheelData}
      />
    </div>
  ))
  .add('location props', () => (
    <Wheel
      {...getInteractionProps()}
      {...props}
      wheelType="Location"
      itemsData={wheelData}
    />
  ));
