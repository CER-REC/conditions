import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

import MethodologyBox from '.';

const pdfUrl = 'abc';

describe('Components|MainInfoBar/MethodologyBox', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<MethodologyBox pdfUrl={pdfUrl} />);
    });

    shouldBehaveLikeAComponent(MethodologyBox, () => wrapper);
  });
});
