import React from 'react';
import { shallow } from 'enzyme';

import CompanyFlag from '.';

describe('Components|Wheel/CompanyFlag', () => {
  describe('with default props', () => {
    const wrapper = shallow(
      <CompanyFlag
        flagLayout={['1551111', '313', '77', '1']}
      />,
    );
  });
});
