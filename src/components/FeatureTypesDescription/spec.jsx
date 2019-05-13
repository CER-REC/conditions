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
        .at(2)
        .shallowWithIntl(messages)
        .find('p');

      expect(p).toHaveLength(3);
    });
  });
});
