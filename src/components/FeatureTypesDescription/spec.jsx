import React from 'react';
import { shallowWithIntl, shouldBehaveLikeAComponent } from '../../tests/utilities';

import FeatureTypesDescription from '.';

const defaultProps = {
  feature: 'theme',
  types: ['security'],
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
        {
          'common.theme.security': 'Security',
          'components.featureTypesDescription.theme.security': '1\n2\n3',
        },
      );
    });

    shouldBehaveLikeAComponent(FeatureTypesDescription, () => wrapper);

    test('should split multi-line text into paragraphs', () => {
      expect(wrapper.find('p')).toHaveLength(3);
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
