/* eslint-disable no-underscore-dangle */
import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import Wheel from '.';
import ReadMe from './README.md';
import {
  companyWheelData as companyData,
  relevantProjectLookup,
  filteredProjectLookup,
} from './randomDataSample';
import { locationData, displayOrder } from '../../mockData';

const noop = () => {};
const processedLocationData = locationData
  .sort((a, b) => (a.province < b.province ? -1 : 1));
storiesForComponent('Components|Wheel', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(
    withInteraction({
      state: { selectedRay: 0 },
      actions: {
        selectRay: () => selectedRay => ({ selectedRay }),
      },
    }),
  )
  .add('default', () => (
    <Wheel
      {...getInteractionProps()}
      wheelType="company"
      wheelData={companyData}
      relevantProjectLookup={relevantProjectLookup}
      filteredProjectLookup={filteredProjectLookup}
      wheelMotionTrigger={noop}
      displayOrder={displayOrder}
      selectedFeature="theme"
    />
  ))
  .add('location props', () => (
    <Wheel
      {...getInteractionProps()}
      wheelType="location"
      wheelData={processedLocationData}
      wheelMotionTrigger={noop}
      displayOrder={displayOrder}
      selectedFeature="theme"
    />
  ));
