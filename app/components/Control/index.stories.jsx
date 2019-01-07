import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import Control from '.';
import ReadMe from './README.md';

const positionControl = 'translate(30, 30)';
const numOfConditionsLabel = 213;
const yHeight = '20';
const controlTopBaseline = '10';

storiesForComponent('Components|StreamGraph/Control', module, ReadMe)
  .add('with default values', () => (
    <svg><Control
      positionControl={positionControl}
      numOfConditionsLabel={numOfConditionsLabel}
      yHeight={yHeight}
      controlTopBaseline={controlTopBaseline}
    />
    </svg>
  ));
