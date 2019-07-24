import React from 'react';
import { shallow } from 'enzyme';
import { VictoryArea } from 'victory';

import LegendItem from '.';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';
import { features } from '../../../constants';

const props = {
  feature: 'filing',
  subFeature: 'REQUIRED',
  color: features.filing.REQUIRED,
  data: [
    { x: 2010, y: 316 },
    { x: 2011, y: 827 },
    { x: 2012, y: 421 },
    { x: 2013, y: 108 },
    { x: 2014, y: 236 },
    { x: 2015, y: 312 },
    { x: 2016, y: 2311 },
    { x: 2017, y: 175 },
    { x: 2018, y: 343 },
  ],
  max: 2311,
};

describe('Components|SmallMultiplesLegend/LegendItem', () => {
  let wrapper = shallow(<LegendItem className="testtest" {...props} />);

  shouldBehaveLikeAComponent(LegendItem, () => wrapper);

  describe('when the all property is provided', () => {
    beforeEach(() => {
      wrapper = shallow(<LegendItem {...props} all />);
    });

    test('should not render the graph', () => {
      expect(wrapper.find(VictoryArea)).toHaveLength(0);
    });

    test('should render with the all class', () => {
      expect(wrapper.hasClass('all')).toBe(true);
    });

    test('should render the formatted all title', () => {
      const id = 'components.smallMultiplesLegend.all.filing';
      expect(wrapper.find('FormattedMessage').prop('id')).toBe(id);
    });
  });

  describe('when there is no all property provided', () => {
    beforeEach(() => {
      wrapper = shallow(<LegendItem {...props} />);
    });

    test('should render the formatted title', () => {
      const id = 'common.filing.REQUIRED';
      expect(wrapper.find('.stream')).toHaveLength(1);
      expect(wrapper.find('FormattedMessage').prop('id')).toBe(id);
    });

    test('should render the graph', () => {
      const victoryAreaWrapper = wrapper.find(VictoryArea);

      expect(victoryAreaWrapper).toHaveLength(1);
      expect(victoryAreaWrapper.prop('maxDomain')).toEqual({ y: props.max });

      expect(victoryAreaWrapper.prop('data')).toEqual(props.data);
    });

    test('should render without the all class', () => {
      expect(wrapper.hasClass('all')).toBe(false);
    });

    test('should render without the faded class', () => {
      expect(wrapper.hasClass('faded')).toBe(false);
    });

    test('should render with the faded class when the faded property is provided', () => {
      wrapper = shallow(<LegendItem {...props} faded />);
      expect(wrapper.hasClass('faded')).toBe(true);
    });
  });
});
