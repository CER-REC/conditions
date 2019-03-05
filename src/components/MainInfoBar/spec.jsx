import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import MainInfoBar from '.';

const noop = () => {};

describe('Components|MainInfoBar', () => {
  describe('with default props', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = {
        setActiveDialog: jest.fn(),
        toggleExpanded: jest.fn(),
      };

      wrapper = shallow(<MainInfoBar
        pdfUrl="???"
        openDataModal={noop}
        openScreenshotModal={noop}
        setActiveDialog={spy.setActiveDialog}
        toggleExpanded={spy.toggleExpanded}
      />);
    });

    shouldBehaveLikeAComponent(MainInfoBar, () => wrapper);
  });
});
