import React from 'react';
import { shallow } from 'enzyme';
import { VictoryArea } from 'victory';

import LegendItem from '.';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

describe('Components|SmallMultiplesLegend/LegendItem', () => {
  let wrapper = shallow((
    <LegendItem
      className="testtest"
      title="Test Title"
      feature="Feat."
      data={[]}
      color=""
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
          data={[]}
          color=""
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
    const title = '(<{}>)other_test-title.!?';
    const feature = 'test feature';
    const color = 'red';
    const max = 500;
    const data = [{
      date: 2018,
      count: 12,
    }, {
      date: 2019,
      count: 1,
    }, {
      date: 2020,
      count: 345,
    }];

    beforeEach(() => {
      wrapper = shallow((
        <LegendItem
          className="testclass"
          title={title}
          feature={feature}
          data={data}
          color={color}
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
      expect(victoryAreaWrapper.prop('style')).toEqual({ data: { fill: color } });

      expect(victoryAreaWrapper.prop('data')).toEqual(
        expect.arrayContaining(data.map(({ date, count }) => ({ x: date, y: count })))
      );
    });

    test('should render without the all class', () => {
      expect(wrapper.hasClass('all')).toBe(false);
    });

    test('should render without the faded class', () => {
      expect(wrapper.hasClass('faded')).toBe(false);
    });

    test(
      'should render with the faded class when the faded property is provided',
      () => {
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
      }
    );
  });
});
