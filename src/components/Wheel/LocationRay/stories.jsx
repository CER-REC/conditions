import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';

import ReadMe from './README.md';

import LocationRay from '.';

import { features } from '../../../constants';

const themeKeys = Object.keys(features.theme);
 const values = [1, 3, 5, 2, 9, 15, 6, 8, 5, 2, 9, 15, 6, 8];
const randomLocationBars = Array(1).fill('')
  .map(() => themeKeys.map((subFeature, index) => ({
    value: values[index],
    fill: features.theme[subFeature],
  })));

const degreesPerItem = 5;
storiesForComponent('Components|Wheel/LocationRay', module, ReadMe)
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
  ));
