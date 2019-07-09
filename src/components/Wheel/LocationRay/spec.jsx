import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';
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

describe('Components|Wheel/LocationRay', () => {
  describe('with default props', () => {
    const wrapper = shallow(
      <LocationRay
        regionId={1}
        items={randomLocationBars}
        height={degreesPerItem * 2}
        width="163"
        searched
        adjustRotationReference={degreesPerItem / 2}
        displayOrder={displayOrder}
        selectedFeature="theme"
      />,
    );
    shouldBehaveLikeAComponent(LocationRay, () => wrapper);
  });
});
