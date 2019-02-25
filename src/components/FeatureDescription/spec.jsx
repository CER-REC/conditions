import React from 'react';
import { shallow } from 'enzyme';
import FeatureDescription from '.';

describe('Components|FeatureDescription', () => {
  describe('with props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<FeatureDescription feature="theme" />);
    });

    test('should render', () => {
      expect(wrapper.type()).toBe('div');
    });

    test('should have a feature description class', () => {
      expect(wrapper.is('.feature-description')).toBe(true);
    });

    test('should use translation to render out text for the heading', () => {
      const title = wrapper.find('FormattedMessage').first().shallowWithIntl();
      expect(title.type()).toBe('h1');
    });
  });
});
