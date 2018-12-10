import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import WheelRayLegend from './';
import ReadMe from './README.md';

import { locationWheelData, companyWheelData, locationWheelItems } from '../randomDataSample';


storiesForComponent('Components|CompanyWheel/WheelRayLegend', module, ReadMe)
  .add('default view', () => (
    <svg className="wheelContainer" viewBox="70 150 600 600">
      <WheelRayLegend className="wheelContainer" ringType="normal" legendPositionArray={companyWheelData} numOfItems={companyWheelData.length} rotation={0} />
    </svg>
  )).add('location view', () => (
    <svg className="wheelContainer" viewBox="70 150 600 600">
      <WheelRayLegend className="wheelContainer" ringType="location" legendPositionArray={locationWheelData} numOfItems={locationWheelItems} rotation={0} />
    </svg>
  ));

