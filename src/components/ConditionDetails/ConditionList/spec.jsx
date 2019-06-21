import React from 'react';
import { shallow, mount } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

import ConditionList from '.';

const data = [
  {
    isInstrument: true,
    instrumentNumber: 'XO-001-2018',
    instrumentIndex: 0,
    itemIndex: -1,
    id: 100,
  },
  {
    binnedValue: 3,
    fill: ['pink'],
    marked: true,
    instrumentIndex: 0,
    itemIndex: 0,
    id: 101,
  },
  {
    binnedValue: 2,
    fill: ['blue', 'red', 'green'],
    instrumentIndex: 0,
    itemIndex: 1,
    id: 102,
  },
  {
    isInstrument: true,
    instrumentNumber: 'XO-003-2018',
    instrumentIndex: 1,
    itemIndex: -1,
    id: 103,
  },
  {
    binnedValue: 1,
    fill: ['red'],
    instrumentIndex: 1,
    itemIndex: 0,
    id: 104,
  },
  {
    binnedValue: 2,
    fill: ['red'],
    instrumentIndex: 1,
    itemIndex: 1,
    id: 105,
  },
  {
    isInstrument: true,
    instrumentNumber: 'XO-005-2018',
    instrumentIndex: 2,
    itemIndex: -1,
    id: 106,
  },
  {
    binnedValue: 3,
    fill: ['orange'],
    marked: true,
    instrumentIndex: 2,
    itemIndex: 0,
    id: 107,
  },
];

const defaultProps = {
  items: data,
  selectedItem: 3,
};

describe('Components|ConditionDetails/ConditionList', () => {
  describe('with default props', () => {
    let wrapper;
    let spy;

    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <ConditionList
          {...defaultProps}
          updateSelectedItem={spy}
        />,
      );
    });

    shouldBehaveLikeAComponent(ConditionList, () => wrapper);

    it('should create bars with a single color', () => {
      const barItems = wrapper.find('.ConditionList')
        .find('List').props()
        .items[1].props
        .children[1].props
        .items;

      expect(barItems.length).toBe(1);
    });

    it('should create bars with multiple colors', () => {
      const barItems = wrapper.find('.ConditionList')
        .find('List').props()
        .items[2].props
        .children[1].props
        .items;

      expect(barItems.length).toBe(3);
    });
  });

  describe('mounted', () => {
    let wrapper;
    let spy;

    beforeEach(() => {
      spy = jest.fn();
      wrapper = mount(
        <ConditionList
          {...defaultProps}
          updateSelectedItem={spy}
        />,
      );
    });

    it('should call updateSelectedItem with an instrument index and item index', () => {
      wrapper.find('.ConditionList')
        .find('List').props().onChange(2);

      expect(spy).toHaveBeenCalledWith(102);
    });
  });
});
