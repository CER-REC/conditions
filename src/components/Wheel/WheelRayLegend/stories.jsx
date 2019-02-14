import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import WheelRayLegend from '.';
import ReadMe from './README.md';

import { locationWheelData, companyWheelData } from '../randomDataSample';

const reservedDegrees = 20;

storiesForComponent('Components|Wheel/WheelRayLegend', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('default view', () => (
    <svg className="wheelContainer" viewBox="70 150 600 600">
      <WheelRayLegend
        className="wheelContainer"
        ringType="Company"
        legendPositionArray={companyWheelData.legendData}
        degreesPerItem={(360 - reservedDegrees) / companyWheelData.legendData.length}
        rotation={0}
        reservedDegrees={reservedDegrees}
      />
    </svg>
  ))
  .add('location view', () => (
    <svg className="wheelContainer" viewBox="70 150 600 600">
      <WheelRayLegend
        className="wheelContainer"
        ringType="location"
        legendPositionArray={locationWheelData.legendData}
        rotation={0}
        degreesPerItem={(360 - reservedDegrees) / companyWheelData.legendData.length}
        reservedDegrees={reservedDegrees}
      />
    </svg>
  ));

