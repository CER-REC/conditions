import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

import GuideDetail from '.';

describe('Components|ConditionExplorer/GuideDetail', () => {
  describe('default', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<GuideDetail />);
    });
    shouldBehaveLikeAComponent(GuideDetail, () => wrapper);
  });
});
