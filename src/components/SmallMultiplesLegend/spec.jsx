import React from 'react';
import { shallow } from 'enzyme';

import SmallMultiplesLegend from '.';
import LegendItem from './LegendItem';
import List from '../List';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

const data = [
  {
    feature: 'theme',
    subFeature: 'SECURITY',
    years: {
      2018: 12,
      2019: 1,
      2020: 345,
    },
  },
  {
    feature: 'theme',
    subFeature: 'MANAGEMENT_SYSTEM',
    years: {
      2018: 7,
      2019: 8,
      2020: 9,
    },
  },
  {
    feature: 'theme',
    subFeature: 'FINANCIAL',
    years: {
      2018: 20,
      2019: 37,
      2020: 12,
    },
  },
];

describe('Components|SmallMultiplesLegend', () => {
  let spy;
  const noop = () => {};
  let wrapper;

  beforeEach(() => {
    spy = jest.fn();
    wrapper = shallow((
      <SmallMultiplesLegend
        className="test"
        feature="theme"
        data={[]}
        onChange={noop}
      />
    ));
  });

  shouldBehaveLikeAComponent(SmallMultiplesLegend, () => wrapper);

  describe('when only one data condition is provided', () => {
    beforeEach(() => {
      wrapper = shallow((
        <SmallMultiplesLegend
          className="anotherClass"
          feature="theme"
          data={data.slice(0, 1)}
          onChange={spy}
          selected={data[0].subFeature}
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

      expect(spy).toHaveBeenLastCalledWith(data[0].subFeature);
    });

    test('should render the List component with the first item selected', () => {
      expect(wrapper.find(List).prop('selected')).toBe(0);
    });
  });

  describe('when multiple data conditions are provided', () => {
    beforeEach(() => {
      wrapper = shallow((
        <SmallMultiplesLegend
          className="something123"
          feature="theme"
          data={data}
          onChange={spy}
        />
      ));
    });

    test('should render the data as LegendItem components in the List component', () => {
      const listItemsWrapper = wrapper.find(List).shallow().find(LegendItem).not('[all=true]');

      for (let i = 0; i < data.length; i += 1) {
        const listItemWrapper = listItemsWrapper.at(i);

        expect(listItemWrapper.type()).toBe(LegendItem);
        expect(listItemWrapper.prop('title')).toBe(data[i].subFeature);
        expect(listItemWrapper.prop('data')).toEqual(data[i]);
      }
    });

    test('should pass the same max value to the LegendItem components', () => {
      const listItemsWrapper = wrapper.find(List).shallow().find(LegendItem).not('[all=true]');

      for (let i = 0; i < data.length; i += 1) {
        expect(listItemsWrapper.at(i).prop('max')).toBe(345);
      }
    });

    test('should render the all LegendItem component', () => {
      const legendItemsWrapper = wrapper.find(List).shallow().find(LegendItem);
      const firstItemWrapper = legendItemsWrapper.at(0);

      expect(firstItemWrapper.prop('all')).toBe(true);
      expect(firstItemWrapper.prop('title')).toBe('theme');
      expect(legendItemsWrapper).toHaveLength(4);
    });

    test('should call the onChange function with empty string on List item change to the all item', () => {
      // All item is at the top
      wrapper.find(List).prop('onChange')(0);

      expect(spy).toHaveBeenLastCalledWith('');
    });

    test('should call the onChange function with the data name on List item change', () => {
      for (let i = 0; i < data.length; i += 1) {
        // Account for all item at the beginning
        wrapper.find(List).prop('onChange')(i + 1);

        expect(spy).toHaveBeenLastCalledWith(data[i].subFeature);
      }

      expect(spy).toHaveBeenCalledTimes(data.length);
    });

    test('should render the List component with the first item selected', () => {
      expect(wrapper.find(List).prop('selected')).toBe(0);
    });

    test('should not apply faded to LegendItem components', () => {
      const itemsWrapper = wrapper.find(List).shallow().find(LegendItem);

      itemsWrapper.forEach((itemWrapper) => {
        expect([null, false]).toContain(itemWrapper.prop('faded'));
      });
    });

    test('should render the List component with the corresponding item selected when selected is provided', () => {
      wrapper = shallow((
        <SmallMultiplesLegend
          feature="theme"
          data={data}
          onChange={noop}
          selected={data[2].subFeature}
        />
      ));

      // An "All" item is rendered at the top for multiple data conditions
      expect(wrapper.find(List).prop('selected')).toBe(3);
    });

    test('should render the List component with the first item selected when selected is invalid', () => {
      wrapper = shallow((
        <SmallMultiplesLegend
          feature="theme"
          data={data}
          onChange={noop}
          selected="N/A"
        />
      ));

      expect(wrapper.find(List).prop('selected')).toBe(0);
    });

    test('should apply faded to LegendItem components when a highlightName is provided', () => {
      const highlightName = data[2].subFeature;

      wrapper = shallow((
        <SmallMultiplesLegend
          className="abcd"
          feature="theme"
          data={data}
          onChange={noop}
          highlightName={highlightName}
        />
      ));

      const highlightSelector = `[title="${highlightName}"]`;
      const listWrapper = wrapper.find(List).shallow();
      const fadedItemsWrapper = listWrapper.find(LegendItem).not(highlightSelector);
      const highlightItemWrapper = listWrapper.find(LegendItem).filter(highlightSelector);

      expect(listWrapper.hasClass('faded')).toBe(true);

      fadedItemsWrapper.forEach((itemWrapper) => {
        expect(itemWrapper.prop('faded')).toBe(true);
      });

      expect(highlightItemWrapper.prop('faded')).toBe(false);
    });

    test('should not apply faded to LegendItem components when the highlightName is invalid', () => {
      wrapper = shallow((
        <SmallMultiplesLegend
          className="abcd"
          feature="theme"
          data={data}
          onChange={noop}
          highlightName="n/a"
        />
      ));

      const listWrapper = wrapper.find(List).shallow();
      const itemsWrapper = listWrapper.find(LegendItem);

      expect(listWrapper.hasClass('faded')).toBe(false);

      itemsWrapper.forEach((itemWrapper) => {
        expect([null, false]).toContain(itemWrapper.prop('faded'));
      });
    });
  });
});
