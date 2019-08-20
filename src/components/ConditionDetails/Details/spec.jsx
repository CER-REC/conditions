import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

import Details from '.';

const data = {
  theme: ['ENVIRONMENTAL_PROTECTION'],
  instrument: 'instrument.CONSTRUCTION',
  phase: 'phase.DURING_CONSTRUCTION_PHASE',
  type: 'type.STANDARD',
  status: 'status.IN_PROGRESS',
  filing: 'filing.REQUIRED',
};

describe('Components|ConditionDetails/Details', () => {
  describe('when a condition is selected', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Details data={data} />);
    });

    shouldBehaveLikeAComponent(Details, () => wrapper);

    it('should show text content', () => {
      const topLevel = wrapper.find('.content').children();
      expect(topLevel).toHaveLength(3);

      const detailBlocks = topLevel.find('DetailBlocks')
        .shallow()
        .children();

      expect(detailBlocks).toHaveLength(4);
    });
  });

  describe('when an instrument is selected', () => {
    const wrapper = shallow(<Details data={null} isInstrument />);
    it('should not show any text content', () => {
      const items = wrapper.find('.Details')
        .find('.content')
        .children();

      expect(items).toHaveLength(0);
    });
  });
});
