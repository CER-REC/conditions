import React from 'react';
import { shallow } from 'enzyme';

import InstrumentsLegend from '.';
import LegendItem from './LegendItem';
import List from '../List';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

describe('Components|InstrumentsLegend', () => {
  let spy;
  let wrapper;
  const noop = () => {};

  beforeEach(() => {
    spy = jest.fn();
    wrapper = shallow((
      <InstrumentsLegend
        className="test"
        data={[]}
        onChange={noop}
      />
    ));
  });

  shouldBehaveLikeAComponent(InstrumentsLegend, () => wrapper);

  describe('when only one category exists in the data', () => {
    const category = 'category';
    const data = [{
      parentName: 'I.1',
      children: [{
        category,
      }, {
        category,
      }],
    }, {
      parentName: 'I.2',
      children: [{
        category,
      }],
    }];

    beforeEach(() => {
      wrapper = shallow((
        <InstrumentsLegend
          data={data}
          onChange={spy}
          selected={data[0].name}
        />
      ));
    });

    test('should not render a "All" list item', () => {
      const legendItemsWrapper = wrapper.find(List).shallow().find(LegendItem);

      expect(legendItemsWrapper.filter('[all=true]')).toHaveLength(0);
      expect(legendItemsWrapper).toHaveLength(1);
    });

    test('should call the onChange function on List item change', () => {
      wrapper.find(List).prop('onChange')(0);

      expect(spy).toHaveBeenLastCalledWith(category);
    });

    test('should render the List component with the first item selected', () => {
      expect(wrapper.find(List).prop('selected')).toBe(0);
    });
  });

  describe('when multiple categories exists in the data', () => {
    const categories = ['C1', 'C2', 'C3', 'C4', 'C5'];
    const categoryIndicators = [
      [true, true, true, true],
      [true, true, false, false],
      [true, true, false, false],
      [false, true, false, false],
      [false, true, true, false],
    ];
    const data = [{
      parentName: 'OIL',
      children: [],
    }, {
      parentName: 'GAS',
      children: [],
    }, {
      parentName: 'POWER',
      children: [],
    }, {
      parentName: 'NOT_SPECIFIED',
      children: [],
    }];

    // Fill in data children elements based on the category indicators
    data.forEach((indicatorsData, typeIndex) => {
      categoryIndicators.forEach((indicators, categoryIndex) => {
        if (indicators[typeIndex]) {
          indicatorsData.children.push({
            category: categories[categoryIndex],
          });
        }
      });
    });

    beforeEach(() => {
      wrapper = shallow((
        <InstrumentsLegend
          className="c"
          data={data}
          onChange={spy}
        />
      ));
    });

    test('should render the indicator type headers', () => {
      const headersWrapper = wrapper.find('.headers FormattedMessage');

      data.forEach((indicatorsData, index) => {
        const id = `common.instrument.type.${indicatorsData.parentName}`;

        expect(headersWrapper.at(index).prop('id')).toBe(id);
        expect(headersWrapper.at(index).shallowWithIntl().hasClass('indicator')).toBe(true);
      });
    });

    test('should render the data as LegendItem components in the List component', () => {
      for (let i = 0; i < categories.length; i += 1) {
        const listItemWrapper = wrapper.find(List).shallow().find(LegendItem).find(`[title='${categories[i]}']`);

        expect(listItemWrapper).toHaveLength(1);
        expect(listItemWrapper.type()).toBe(LegendItem);
        expect(listItemWrapper.prop('indicators')).toEqual(categoryIndicators[i]);
      }
    });

    test('should render the all LegendItem component', () => {
      const legendItemsWrapper = wrapper.find(List).shallow().find(LegendItem);

      expect(legendItemsWrapper.at(0).prop('all')).toBe(true);
      expect(legendItemsWrapper).toHaveLength(6);
    });

    test('should call the onChange function with null on List item change to the all item', () => {
      // All item is at the top
      wrapper.find(List).prop('onChange')(0);

      expect(spy).toHaveBeenLastCalledWith(null);
    });

    test('should call the onChange function with the categories name on List item change', () => {
      for (let i = 0; i < categories.length; i += 1) {
        // Account for all item at the beginning
        wrapper.find(List).prop('onChange')(i + 1);

        expect(spy).toHaveBeenLastCalledWith(categories[i]);
      }

      expect(spy).toHaveBeenCalledTimes(categories.length);
    });

    test('should render the List component with the first item selected', () => {
      expect(wrapper.find(List).prop('selected')).toBe(0);
    });

    test('should render the List component with the corresponding item selected when selected is provided', () => {
      wrapper = shallow((
        <InstrumentsLegend
          data={data}
          onChange={noop}
          selected={categories[2]}
        />
      ));

      // An "All" item is rendered at the top for multiple categories
      expect(wrapper.find(List).prop('selected')).toBe(3);
    });

    test('should render the List component with the first item selected when selected is invalid', () => {
      wrapper = shallow((
        <InstrumentsLegend
          data={data}
          onChange={noop}
          selected="?"
        />
      ));

      expect(wrapper.find(List).prop('selected')).toBe(0);
    });
  });
});
