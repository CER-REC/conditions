import React from 'react';
import { shallow } from 'enzyme';
import { VictoryArea } from 'victory';

import LegendItem from '.';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';
import { features } from '../../../constants';

const data = {
  feature: 'theme',
  subfeature: 'SECURITY',
  years: {
    2018: 12,
    2019: 1,
    2020: 345,
  },
};

describe('Components|SmallMultiplesLegend/LegendItem', () => {
  let wrapper = shallow((
    <LegendItem
      className="testtest"
      title="security"
      feature="theme"
      data={data}
      max={0}
    />
  ));

  shouldBehaveLikeAComponent(LegendItem, () => wrapper);

  describe('when the all property is provided', () => {
    const title = 'a1';

    beforeEach(() => {
      wrapper = shallow((
        <LegendItem
          title={title}
          feature={title}
          max={0}
          all
        />
      ));
    });

    test('should not render the graph', () => {
      expect(wrapper.find(VictoryArea)).toHaveLength(0);
    });

    test('should render with the all class', () => {
      expect(wrapper.hasClass('all')).toBe(true);
    });

    test('should render the formatted all title', () => {
      const id = `components.smallMultiplesLegend.all.${title}`;
      expect(wrapper.find('FormattedMessage').prop('id')).toBe(id);
    });
  });

  describe('when there is no all property provided', () => {
    const title = 'SECURITY';
    const feature = 'theme';
    const max = 500;

    beforeEach(() => {
      wrapper = shallow((
        <LegendItem
          className="testclass"
          title={title}
          feature={feature}
          data={data}
          max={max}
        />
      ));
    });

    test('should render the formatted title', () => {
      const id = `common.${feature}.${title}`;

      expect(wrapper.find('.stream')).toHaveLength(1);
      expect(wrapper.find('FormattedMessage').prop('id')).toBe(id);
    });

    test('should render the graph', () => {
      const victoryAreaWrapper = wrapper.find(VictoryArea);

      expect(victoryAreaWrapper).toHaveLength(1);
      expect(victoryAreaWrapper.prop('maxDomain')).toEqual({ y: max });
      expect(victoryAreaWrapper.prop('style'))
        .toEqual({ data: { fill: features[feature][title] } });

      expect(victoryAreaWrapper.prop('data')).toEqual(
        expect.arrayContaining(Object.entries(data.years).map(([x, y]) => ({ x, y }))),
      );
    });

    test('should render without the all class', () => {
      expect(wrapper.hasClass('all')).toBe(false);
    });

    test('should render without the faded class', () => {
      expect(wrapper.hasClass('faded')).toBe(false);
    });

    test('should render with the faded class when the faded property is provided', () => {
      wrapper = shallow((
        <LegendItem
          className="myClass"
          title={title}
          feature={feature}
          data={data}
          color="#AACC11"
          max={0}
          faded
        />
      ));

      expect(wrapper.hasClass('faded')).toBe(true);
    });
  });
});
