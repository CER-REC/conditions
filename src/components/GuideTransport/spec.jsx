import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import GuideTransport from '.';

describe('Components|GuideTransport', () => {
  describe('with default props', () => {
    const spy = {
      back: jest.fn(),
      forward: jest.fn(),
      togglePlay: jest.fn(),
    };
    const wrapper = shallow(<GuideTransport {...spy} />);

    shouldBehaveLikeAComponent(GuideTransport, () => wrapper);

    xtest('should call its Back callback', () => {});
    xtest('should call its Forward callback', () => {});
    xtest('should call its togglePlay callback', () => {});
  });
});
