import React from 'react';
import { shallow } from 'enzyme';

import InstrumentsLegend from '.';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

describe('Components|InstrumentsLegend', () => {
  let spy;
  let wrapper;
  const noop = () => {};
  const rowIndicators = {
    ROUTING: [true, false, false],
    OPENING: [true, true, false],
    MISC: [true, false, true],
  };
  const data = [{
    prefix: 'GPLO',
    value: 40,
    type: 'OPENING',
    commodity: ['OIL', 'GAS'],
  },
  {
    prefix: 'OPLO',
    value: 20,
    type: 'ROUTING',
    commodity: ['OIL'],
  },
  {
    prefix: 'OPSO',
    value: 33,
    type: 'MISC',
    commodity: ['OIL', 'POWER'],
  }];

  beforeEach(() => {
  spy = jest.fn();
    wrapper = shallow((
      <InstrumentsLegend
        className="c"
        data={data}
        onChange={spy}
        selected=""
      />
    ));
  });

  shouldBehaveLikeAComponent(InstrumentsLegend, () => wrapper);

  test('should render the indicator type headers', () => {
    const headersWrapper = wrapper.find('.headers FormattedMessage');

    data.forEach((indicatorsData, index) => {
      const id = `common.instrumentCommodityType.${indicatorsData.commodity[0]}`;
      expect(headersWrapper.at(0).prop('id')).toBe(id);
      expect(headersWrapper.at(index).shallowWithIntl().hasClass('indicator')).toBe(true);
    });
  });

  test('should render the data as LegendItem components in the List component', () => {
    const listItems = wrapper.find('List').prop('items');
    Object.entries(rowIndicators).forEach(([rowName, expectedIndicators]) => {
      const item = listItems.filter(element => element.props.title === rowName);
      expect(item).toHaveLength(1);
      expect(item[0].props.indicators).toEqual(expectedIndicators);
    });
  });

  test('should render the all LegendItem component', () => {
    const legendItemsWrapper = wrapper.find('List').shallow().find('LegendItem');

    expect(legendItemsWrapper.at(0).prop('all')).toBe(true);
    expect(legendItemsWrapper).toHaveLength(4);
  });

  test('should call the onChange function with empty string on List item change to the all item', () => {
    // All item is at the top
    wrapper.find('List').prop('onChange')(0);

    expect(spy).toHaveBeenLastCalledWith('');
  });

  test('should call the onChange function with the column name on List item change', () => {
    const listItems = wrapper.find('List').prop('items');
    for (let i = 0; i < Object.keys(rowIndicators).length; i += 1) {
      // Account for all item at the beginning
      wrapper.find('List').prop('onChange')(i + 1);
      expect(spy).toHaveBeenLastCalledWith(listItems[i + 1].props.title);
    }
  });

  test('should render the List component with the first item selected', () => {
    expect(wrapper.find('List').prop('selected')).toBe(0);
  });

  test('should render the List component with the corresponding item selected when selected is provided', () => {
    wrapper = shallow((
      <InstrumentsLegend
        data={data}
        onChange={noop}
        selected="OPENING"
      />
    ));

    const listItems = wrapper.find('List').prop('items');
    const selectedIndex = listItems.findIndex(item => item.props.title === 'OPENING');
    // An "All" item is rendered at the top for multiple categories
    expect(wrapper.find('List').prop('selected')).toBe(selectedIndex);
  });

  test('should render the List component with the first item selected when selected is invalid', () => {
    wrapper = shallow((
      <InstrumentsLegend
        data={data}
        onChange={noop}
        selected="?"
      />
    ));

    expect(wrapper.find('List').prop('selected')).toBe(0);
  });
});
