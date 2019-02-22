import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';
import FeatureTypesDescription from '.';

const defaultProps = {
  feature: 'theme',
  types: ['SECURITY'],
};

const instrumentProps = {
  feature: 'instrument.category',
  types: ['ROUTING', 'CONSTRUCTION'],
  colorCodes: {
    OPL: 'ROUTING',
    GPL: 'ROUTING',
    GC: 'CONSTRUCTION',
    OC: 'CONSTRUCTION',
  },
};

const messages = {
  'common.theme.SECURITY': 'Security',
  'components.featureTypesDescription.theme.SECURITY': '1\n2\n3',
};

describe('Components|FeatureTypesDescription', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<FeatureTypesDescription {...defaultProps} />);
    });

    shouldBehaveLikeAComponent(FeatureTypesDescription, () => wrapper);

    test('should split multi-line text into paragraphs', () => {
      const p = wrapper.find('FormattedMessage').at(1).shallowWithIntl(messages)
        .find('p');

      expect(p).toHaveLength(3);
    });
  });

  describe('when showing instruments', () => {
    const wrapper = shallow(<FeatureTypesDescription {...instrumentProps} />);

    test('should color the instrument code for each paragraph', () => {
      const p = wrapper.find('FormattedMessage').at(1).shallowWithIntl().find('p');
      const span = p.first().shallow().find('span').first();

      expect(span.hasClass('color-ROUTING')).toBe(true);
    });
  });
});
