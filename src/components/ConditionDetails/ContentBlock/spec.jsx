import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

import ContentBlock from '.';

describe('Components|ConditionDetails/Content', () => {
  describe('with default props', () => {
    const wrapper = shallow(
      <ContentBlock
        id="testing"
        content="hello"
      />,
    );

    shouldBehaveLikeAComponent(ContentBlock, () => wrapper);
  });
});
