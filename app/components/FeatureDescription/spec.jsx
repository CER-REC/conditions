import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import FeatureDescription from '.';

const description = 'components.featureDescription.theme';
const feature = 'theme';

describe('Components|FeatureDescription', () => {
  describe('with props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<FeatureDescription description={description} feature={feature} />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a feature description class', () => {
      expect(wrapper.is('.feature-description')).to.equal(true);
    });

    it('should use translation to render out text for the heading', () => {
      const title = wrapper.find('FormattedMessage').first().shallowWithIntl();
      expect(title.type()).to.equal('h1');
    });
  });
});
