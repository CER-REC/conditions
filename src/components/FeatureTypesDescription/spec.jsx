import React from 'react';
import { shallowWithIntl } from '../../tests/utilities';

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

    test('should have the class "feature-types-description"', () => {
      expect(wrapper.is('.feature-types-description')).toBe(true);
    });

    test('should have a heading with translated text', () => {
      const headingText = wrapper.find('h4').first().text();
      expect(headingText).toBe('Security');
    });

    test('should have a paragraph with translated text', () => {
      const paraText = wrapper.find('p').first().text();
      expect(paraText).toBe('Here is a description of the Security theme. If it is selected in the legend, then wherever the user is in this text box they will jump to this header.');
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
