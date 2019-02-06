import React from 'react';
import { intl, shallowWithIntl } from '../../tests/utilities';

import FeatureTypesDescription from '.';

const defaultProps = {
  feature: 'theme',
  types: ['security', 'managementSystem', 'financial'],
};

const instrumentProps = {
  feature: 'instrument.category',
  types: ['routing', 'construction'],
  colorCodes: {
    OPL: 'routing',
    GPL: 'routing',
    GC: 'construction',
    OC: 'construction',
  },
};

describe('Components|FeatureTypesDescription', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallowWithIntl(
        <FeatureTypesDescription {...defaultProps} />,
      );
    });

    test('should render a wrapper', () => {
      expect(wrapper.type()).toBe('div');
    });

    test('should have the class "FeatureTypesDescription"', () => {
      expect(wrapper.is('.FeatureTypesDescription')).toBe(true);
    });

    test('should have a heading with translated text', () => {
      const headingText = wrapper.find('h4').first().text();
      const expectedText = intl
        .formatMessage({ id: 'common.theme.security' });

      expect(headingText).toBe(expectedText);
    });

    test('should have a paragraph with translated text', () => {
      const paraText = wrapper.find('p').first().text();
      const expectedText = intl
        .formatMessage({ id: 'components.featureTypesDescription.theme.security' })
        .split('\n')[0]; // In case there are multiple paragraphs

      expect(paraText).toBe(expectedText);
    });
  });

  describe('when showing instruments', () => {
    const wrapper = shallowWithIntl(<FeatureTypesDescription {...instrumentProps} />);

    test('should color the instrument code for each paragraph', () => {
      const code = wrapper.find('p').first().shallow().find('span')
        .first();
      expect(code.hasClass('color-routing')).toBe(true);
    });
  });
});
