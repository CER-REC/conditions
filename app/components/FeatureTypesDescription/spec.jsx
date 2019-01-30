import React from 'react';
import { shallow } from 'enzyme';

import FeatureTypeDescription from '.';

describe('Components|FeatureTypeDescription', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<FeatureTypeDescription />);
    });

    test('should render', () => {
      expect(wrapper.type()).toBe('div');
    });

  });
});
