import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

import Details from '.';

const defaultProps = {
  theme: 'theme.environmentalProtection',
  instrument: 'instrument.category.construction',
  phase: 'phase.duringConstruction',
  type: 'type.standard',
  status: 'status.inProgress',
  filing: 'status.noFilingReq',
};

describe('Components|ConditionDetails/Details', () => {
  describe('with default props', () => {
    const wrapper = shallow(
      <Details
        {...defaultProps}
      />,
    );

    shouldBehaveLikeAComponent(Details, () => wrapper);
  });
});
