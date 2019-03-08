import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

import DownloadsBox from '.';

describe('Components|MainInfoBar/DownloadsBox', () => {
  describe('with default props', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = {
        data: jest.fn(),
        screen: jest.fn(),
      };

      wrapper = shallow(<DownloadsBox
        openDataModal={spy.data}
        openScreenshotModal={spy.screen}
      />);
    });

    shouldBehaveLikeAComponent(DownloadsBox, () => wrapper);
  });
});
