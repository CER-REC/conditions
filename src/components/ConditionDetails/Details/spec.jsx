import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

import Details from '.';

const data = {
  theme: 'theme.ENVIRONMENTAL_PROTECTION',
  instrument: 'instrument.CONSTRUCTION',
  phase: 'phase.DURING_CONSTRUCTION_PHASE',
  type: 'type.STANDARD',
  status: 'status.IN_PROGRESS',
  filing: 'status.NO_FILING_REQUIRED',
};

describe('Components|ConditionDetails/Details', () => {
  describe('with default props', () => {
    const wrapper = shallow(
      <Details
        data={data}
      />,
    );

    shouldBehaveLikeAComponent(Details, () => wrapper);
  });
});
