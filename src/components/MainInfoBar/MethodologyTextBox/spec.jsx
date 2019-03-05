import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

import MethodologyTextBox from '.';

const pdfUrl = 'abc';

describe('Components|MainInfoBar/MethodologyTextBox', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<MethodologyTextBox pdfUrl={pdfUrl} />);
    });

    shouldBehaveLikeAComponent(MethodologyTextBox, () => wrapper);

    it('should pass its PDF URL to the link', () => {
      const url = wrapper.find('.MethodologyTextBox')
        .find('a')
        .first()
        .props().href;

      expect(url).toBe(pdfUrl);
    });
  });
});
