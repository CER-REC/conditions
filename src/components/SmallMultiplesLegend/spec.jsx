import React from 'react';
import { shallow } from 'enzyme';

import SmallMultiplesLegend from '.';
import LegendItem from './LegendItem';
import List from '../List';
import { conditionCountsByYear, displayOrder } from '../../mockData';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';
import { features } from '../../constants';
import getStreamGraphData from '../../utilities/getStreamGraphData';

const themes = Object.keys(features.theme);
const formattedData = getStreamGraphData(conditionCountsByYear, 'theme');

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
        allConditionsPerYear={conditionCountsByYear}
        displayOrder={displayOrder}
        onChange={spy}
        selected=""
      />
    ));
  });

  shouldBehaveLikeAComponent(SmallMultiplesLegend, () => wrapper);

  test('should render the data as LegendItem components in the List component', () => {
    const listItemsWrapper = wrapper.find(List).shallow().find(LegendItem).not('[all=true]');

    for (let i = 0; i < themes.length; i += 1) {
      const listItemWrapper = listItemsWrapper.at(i);

      expect(listItemWrapper.type()).toBe(LegendItem);
      expect(listItemWrapper.prop('subFeature')).toBe(themes[i]);
      expect(listItemWrapper.prop('data')).toEqual(formattedData[themes[i]]);
    }
  });

  test('should pass the same max value to the LegendItem components', () => {
    const listItemsWrapper = wrapper.find(List).shallow().find(LegendItem).not('[all=true]');

    for (let i = 0; i < themes.length; i += 1) {
      expect(listItemsWrapper.at(i).prop('max')).toBe(8964);
    }
  });

  test('should render the all LegendItem component', () => {
    const legendItemsWrapper = wrapper.find(List).shallow().find(LegendItem);
    const firstItemWrapper = legendItemsWrapper.at(0);

    expect(firstItemWrapper.prop('all')).toBe(true);
    expect(firstItemWrapper.prop('subFeature')).toBe('theme');
    expect(legendItemsWrapper).toHaveLength(themes.length + 1);
  });

  test('should call the onChange function with empty string on List item change to the all item', () => {
    // All item is at the top
    wrapper.find(List).prop('onChange')(0);

    expect(spy).toHaveBeenLastCalledWith('');
  });

  test('should call the onChange function with the data name on List item change', () => {
    for (let i = 0; i < themes.length; i += 1) {
      // Account for all item at the beginning
      wrapper.find(List).prop('onChange')(i + 1);

      expect(spy).toHaveBeenLastCalledWith(themes[i]);
    }

    expect(spy).toHaveBeenCalledTimes(themes.length);
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
        allConditionsPerYear={conditionCountsByYear}
        displayOrder={displayOrder}
        onChange={noop}
        selected={themes[2]}
      />
    ));

    // An "All" item is rendered at the top for multiple data conditions
    expect(wrapper.find(List).prop('selected')).toBe(3);
  });

  test('should render the List component with the first item selected when selected is invalid', () => {
    wrapper = shallow((
      <SmallMultiplesLegend
        feature="theme"
        allConditionsPerYear={conditionCountsByYear}
        displayOrder={displayOrder}
        onChange={noop}
        selected="N/A"
      />
    ));

    expect(wrapper.find(List).prop('selected')).toBe(0);
  });

  test('should apply faded to LegendItem components when a highlightName is provided', () => {
    const highlightName = 'ENFORCEMENT';

    wrapper = shallow((
      <SmallMultiplesLegend
        className="abcd"
        feature="theme"
        allConditionsPerYear={conditionCountsByYear}
        displayOrder={displayOrder}
        onChange={noop}
        highlightName={highlightName}
        selected=""
      />
    ));

    const listWrapper = wrapper.find(List).shallow();
    const fadedItemsWrapper = listWrapper.find(LegendItem).not({ subFeature: highlightName });
    const highlightItemWrapper = listWrapper.find(LegendItem).find({ subFeature: highlightName });

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
        allConditionsPerYear={conditionCountsByYear}
        displayOrder={displayOrder}
        onChange={noop}
        highlightName="n/a"
        selected=""
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
