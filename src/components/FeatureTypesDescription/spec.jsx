import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';
import FeatureTypesDescription from '.';

const messages = {
  'components.featureTypesDescription.theme.ADMINISTRATIVE': '1\n2\n3',
};

describe('Components|FeatureTypesDescription', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<FeatureTypesDescription feature="theme" />);
    });

    shouldBehaveLikeAComponent(FeatureTypesDescription, () => wrapper);

    test('should split multi-line text into paragraphs', () => {
      const p = wrapper.find('FormattedMessage')
        .at(1)
        .shallowWithIntl(messages)
        .find('p');

      expect(p).toHaveLength(3);
    });
  });

  describe('when showing instruments', () => {
    const wrapper = shallow(<FeatureTypesDescription feature="instrument" />);

    test('should color the instrument code for each paragraph', () => {
      const p = wrapper.find('FormattedMessage').at(1).shallowWithIntl().find('p');
      const spans = p.first().shallow().find('span');
      expect(spans.first().prop('style')).toHaveProperty('color');
      expect(spans).toHaveLength(2);
    });
  });
});
