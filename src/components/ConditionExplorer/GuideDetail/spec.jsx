import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

import GuideDetail from '.';

const noop = () => {};

describe('Components|ConditionExplorer/GuideDetail', () => {
  describe('default', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow((
        <GuideDetail
          radius={250}
          selected={1}
          changeStep={noop}
        />
      ));
    });
    shouldBehaveLikeAComponent(GuideDetail, () => wrapper);
  });
});
