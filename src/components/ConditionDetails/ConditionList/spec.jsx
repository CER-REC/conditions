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
    instrumentId: 100,
    conditionId: 200,
  },
  {
    binnedValue: 3,
    fill: ['pink'],
    marked: true,
    instrumentIndex: 0,
    itemIndex: 0,
    instrumentId: 101,
    conditionId: 201,
  },
  {
    binnedValue: 2,
    fill: ['blue', 'red', 'green'],
    instrumentIndex: 0,
    itemIndex: 1,
    instrumentId: 102,
    conditionId: 202,
  },
  {
    isInstrument: true,
    instrumentNumber: 'XO-003-2018',
    instrumentIndex: 1,
    itemIndex: -1,
    instrumentId: 103,
    conditionId: 203,
  },
  {
    binnedValue: 1,
    fill: ['red'],
    instrumentIndex: 1,
    itemIndex: 0,
    instrumentId: 104,
    conditionId: 204,
  },
  {
    binnedValue: 2,
    fill: ['red'],
    instrumentIndex: 1,
    itemIndex: 1,
    instrumentId: 105,
    conditionId: 205,
  },
  {
    isInstrument: true,
    instrumentNumber: 'XO-005-2018',
    instrumentIndex: 2,
    itemIndex: -1,
    instrumentId: 106,
    conditionId: 206,
  },
  {
    binnedValue: 3,
    fill: ['orange'],
    marked: true,
    instrumentIndex: 2,
    itemIndex: 0,
    instrumentId: 107,
    conditionId: 207,
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

    it('should pass its updateSelectedItem callback to the List component', () => {
      Element.prototype.scrollIntoView = jest.fn();
      wrapper.find('.ConditionList')
        .find('List').props().onChange(2);

      expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
    });

    it('should call updateSelectedItem with the instrument and condition ids', () => {
      wrapper.find('.ConditionList')
        .find('List').props().onChange(2);

      expect(spy).toHaveBeenCalledWith(102, 202);
    });
  });
});
