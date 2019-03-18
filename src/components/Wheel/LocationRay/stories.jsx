import React from 'react';
import { storiesForComponent, withStyles } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import ReadMe from './README.md';

import LocationRay from '.';

import { features } from '../../../constants';

const values = [1, 3, 5, 2, 9, 15, 6, 8, 5, 2, 9, 15, 6, 8];
const randomLocationBars = [Object.keys(features.theme).map((subFeature, index) => ({
  value: values[index],
  fill: features.theme[subFeature],
}))];

const degreesPerItem = 5;
storiesForComponent('Components|Wheel/LocationRay', module, ReadMe)
  .addDecorator(withStyles)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('default', () => (
    <svg>
      <LocationRay
        items={randomLocationBars[0]}
        height={degreesPerItem * 2}
        width="163"
        searched
        adjustRotationReference={degreesPerItem / 2}
      />
    </svg>
  ), { styles: '.Wheel { padding-top: unset }' });
