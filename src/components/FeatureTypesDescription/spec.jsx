import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';
import FeatureTypesDescription from '.';
import { displayOrder } from '../../mockData';

describe('Components|FeatureTypesDescription', () => {
  describe('with default props', () => {
    const wrapper = shallow(
      <FeatureTypesDescription
        feature="theme"
        displayOrder={displayOrder}
      />,
    );

    shouldBehaveLikeAComponent(FeatureTypesDescription, () => wrapper);
  });
});
