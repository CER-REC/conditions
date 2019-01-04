import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import WheelRayLegend from '.';
import ReadMe from './README.md';

import { locationWheelData, companyWheelData, locationWheelItems } from '../randomDataSample';

const reservedDegrees = 20;

storiesForComponent('Components|CompanyWheel/WheelRayLegend', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('default view', () => (
    <svg className="wheelContainer" viewBox="70 150 600 600">
      <WheelRayLegend
        className="wheelContainer"
        ringType="Company"
        legendPositionArray={companyWheelData}
        degreesPerItem={(360 - reservedDegrees) / companyWheelData.length}
        rotation={0}
        reservedDegrees={reservedDegrees}
      />
    </svg>
  )).add('location view', () => (
    <svg className="wheelContainer" viewBox="70 150 600 600">
      <WheelRayLegend
        className="wheelContainer"
        ringType="location"
        legendPositionArray={locationWheelData}
        numOfItems={locationWheelItems}
        rotation={0}
        degreesPerItem={(360 - reservedDegrees) / locationWheelItems}
        reservedDegrees={reservedDegrees}
      />
    </svg>
  ));

