/* eslint-disable no-underscore-dangle */
import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import Wheel from '.';
import { features } from '../../constants';
import ReadMe from './README.md';

import { companyWheelData as companyData } from './randomDataSample';
import locationData from '../../mockData/locationData';

const noop = () => {};
const processedLocationData = locationData
  .sort((a, b) => (a.province < b.province ? -1 : 1))
  .map(region => (
    {
      ...region,
      name: region.name.en,
      province: region.province,
      aggregatedCount: Object.entries(region.aggregatedCount.theme)
        .reduce((acc, [key, val]) => {
          if (key !== '__typename') {
            acc.push({
              feature: 'theme',
              description: key,
              disabled: val <= 0,
              count: val,
              value: val,
              fill: features.theme[key],
              id: region.id,
            });
          }
          return acc;
        }, []),
    }));
storiesForComponent('Components|Wheel', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(
    withInteraction({
      state: { selectedRay: '' },
      actions: {
        selectRay: () => selectedRay => ({ selectedRay }),
      },
    }),
  )
  .add('default', () => (
    <div>
      <Wheel {...getInteractionProps()} wheelType="company" wheelData={companyData} wheelMotionTrigger={noop} />
    </div>
  ))
  .add('location props', () => (
    <Wheel {...getInteractionProps()} wheelType="location" wheelData={processedLocationData} wheelMotionTrigger={noop} />
  ));
