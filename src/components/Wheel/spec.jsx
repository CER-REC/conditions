import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import Wheel from '.';
import { companyWheelData as wheelData } from './randomDataSample';

describe('Components|Wheel', () => {
  let wrapper;
  let spy;
  beforeEach(() => {
    spy = jest.fn();
    wrapper = shallow((
      <Wheel
        wheelType="company"
        itemsData={wheelData}
        selectRay={spy}
      />
    ));
  });

  shouldBehaveLikeAComponent(Wheel, () => wrapper);

  // TODO: IMPLEMENT THE LOCATION TESTS ONCE THEY ARE IMPLEMENTED ON THE DESIGN DOC
});

