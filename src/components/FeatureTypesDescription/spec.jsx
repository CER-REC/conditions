import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';
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
      wrapper = shallow(<FeatureTypesDescription {...defaultProps} />);
    });

    shouldBehaveLikeAComponent(FeatureTypesDescription, () => wrapper);

    test('should split multi-line text into paragraphs', () => {
      const p = wrapper.find('FormattedMessage').at(1).shallowWithIntl(
        {
          'common.theme.security': 'Security',
          'components.featureTypesDescription.theme.security': '1\n2\n3',
        },
      ).find('p');

      expect(p).toHaveLength(3);
    });
  });

  describe('when showing instruments', () => {
    const wrapper = shallow(<FeatureTypesDescription {...instrumentProps} />);

    test('should color the instrument code for each paragraph', () => {
      const p = wrapper.find('FormattedMessage').at(1).shallowWithIntl().find('p');
      const span = p.first().shallow().find('span').first();

      expect(span.hasClass('color-routing')).toBe(true);
    });
  });
});
