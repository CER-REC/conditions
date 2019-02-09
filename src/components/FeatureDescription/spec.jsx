import React from 'react';
import { shallow } from 'enzyme';

import FeatureDescription from '.';

const description = 'components.featureDescription.theme';
const feature = 'theme';

describe('Components|FeatureDescription', () => {
  describe('with props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<FeatureDescription description={description} feature={feature} />);
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
