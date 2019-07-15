import React from 'react';
import { storiesForComponent, withStyles } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import ReadMe from './README.md';
import LocationRay from '.';
import { features } from '../../../constants';
import { displayOrder } from '../../../mockData';

const values = [1, 3, 5, 2, 9, 15, 6, 8, 5, 2, 9, 15, 6, 8];
const randomLocationBars = {
  instrument: [],
  theme: Object.keys(features.theme).map((subFeature, index) => ({
    count: values[index],
    name: subFeature,
  })),
  phase: [],
  status: [],
  type: [],
  filing: [],
};

const degreesPerItem = 5;
storiesForComponent('Components|Wheel/LocationRay', module, ReadMe)
  .addDecorator(withStyles)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('default', () => (
    <svg>
      <LocationRay
        items={randomLocationBars}
        height={degreesPerItem * 2}
        width="163"
        searched
        adjustRotationReference={degreesPerItem / 2}
        displayOrder={displayOrder}
        selectedFeature="theme"
      />
    </svg>
  ), { styles: '.Wheel { padding-top: 0px }' });
