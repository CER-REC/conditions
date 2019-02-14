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
        color=""
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
          color=""
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
    const color = 'black';
    const indicators = [true, false, true, false];

    beforeEach(() => {
      wrapper = shallow((
        <LegendItem
          className="testclass"
          title={title}
          indicators={indicators}
          color={color}
        />
      ));
    });

    test('should render the title', () => {
      const id = `common.instrument.category.${title}`;

      expect(wrapper.find('.indicators')).toHaveLength(1);
      expect(wrapper.find(FormattedMessage).prop('id')).toBe(id);
    });

    test('should render the indicators', () => {
      const indicatorsWrapper = wrapper.find('.indicators');

      expect(indicatorsWrapper.children()).toHaveLength(indicators.length);

      indicators.forEach((indicator, index) => {
        const style = indicatorsWrapper.childAt(index).prop('style');

        if (indicator) {
          expect(style).toMatchObject({ backgroundColor: color });
        } else {
          expect(style).not.toHaveProperty('backgroundColor');
        }
      });
    });
  });
});
