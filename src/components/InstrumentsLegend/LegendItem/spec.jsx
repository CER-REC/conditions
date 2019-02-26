import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';

import LegendItem from '.';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

describe('Components|InstrumentsLegend/LegendItem', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow((
      <LegendItem
        className="testclass"
        title="Test Title"
        indicators={[]}
      />
    ));
  });

  shouldBehaveLikeAComponent(LegendItem, () => wrapper);

  describe('when the all property is provided', () => {
    const title = '1';

    beforeEach(() => {
      wrapper = shallow((
        <LegendItem
          title={title}
          indicators={[]}
          all
        />
      ));
    });

    test('should not render the indicators', () => {
      expect(wrapper.find('.indicator')).toHaveLength(0);
    });

    test('should render the all title', () => {
      const id = 'components.instrumentsLegend.all';

      expect(wrapper.find(FormattedMessage).prop('id')).toBe(id);
    });
  });

  describe('when there is no all property provided', () => {
    const title = 'abc';
    const indicators = [true, false, true, false];

    beforeEach(() => {
      wrapper = shallow((
        <LegendItem
          className="testclass"
          title={title}
          indicators={indicators}
        />
      ));
    });

    test('should render the title', () => {
      const id = `common.instrument.${title}`;

      expect(wrapper.find('.indicators')).toHaveLength(1);
      expect(wrapper.find(FormattedMessage).prop('id')).toBe(id);
    });

    test('should render the indicators', () => {
      const indicatorsWrapper = wrapper.find('.indicators');

      expect(indicatorsWrapper.children()).toHaveLength(indicators.length);

      indicators.forEach((indicator, index) => {
        const style = indicatorsWrapper.childAt(index).prop('style');

        if (indicator) {
          expect(style).toHaveProperty('backgroundColor');
        } else {
          expect(style).not.toHaveProperty('backgroundColor');
        }
      });
    });
  });
});
