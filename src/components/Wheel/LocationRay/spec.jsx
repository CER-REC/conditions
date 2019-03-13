import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

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

describe('Components|Wheel/LocationRay', () => {
  describe('with default props', () => {
    const wrapper = shallow(
      <LocationRay
        items={randomLocationBars[0]}
        height={degreesPerItem * 2}
        width="163"
        searched={Boolean(Math.round(Math.random()))}
        adjustRotationReference={degreesPerItem / 2}
      />,
    );
    shouldBehaveLikeAComponent(LocationRay, () => wrapper);
  });
});
