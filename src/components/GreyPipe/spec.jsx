import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import GreyPipe from '.';

describe('Components|GreyPipe', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<GreyPipe />);
    });

    test('should render', () => {
      expect(wrapper.type()).toBe('div');
    });

    shouldBehaveLikeAComponent(GreyPipe, () => wrapper);

    test('should have two curved path element', () => {
      expect(wrapper.find('path')).toHaveLength(2);
    });
  });
});

