import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

import DownloadBox from '.';

describe('Components|MainInfoBar/DownloadBox', () => {
  describe('with default props', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = {
        data: jest.fn(),
        screen: jest.fn(),
      };

      wrapper = shallow(<DownloadBox
        openDataModal={spy.data}
      />);
    });

    shouldBehaveLikeAComponent(DownloadBox, () => wrapper);
  });
});
