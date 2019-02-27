import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

import ConditionList from '.';

const data = [
  {
    isInstrument: true,
    instrumentNumber: 'XO-001-2018',
    instrumentIndex: 0,
    itemIndex: -1,
  },
  {
    binnedValue: 3,
    fill: ['pink'],
    marked: true,
    instrumentIndex: 0,
    itemIndex: 0,
  },
  {
    binnedValue: 2,
    fill: ['blue', 'red', 'green'],
    instrumentIndex: 0,
    itemIndex: 1,
  },
  {
    isInstrument: true,
    instrumentNumber: 'XO-003-2018',
    instrumentIndex: 1,
    itemIndex: -1,
  },
  {
    binnedValue: 1,
    fill: ['red'],
    instrumentIndex: 1,
    itemIndex: 0,
  },
  {
    binnedValue: 2,
    fill: ['red'],
    instrumentIndex: 1,
    itemIndex: 1,
  },
  {
    isInstrument: true,
    instrumentNumber: 'XO-005-2018',
    instrumentIndex: 2,
    itemIndex: -1,
  },
  {
    binnedValue: 3,
    fill: ['orange'],
    marked: true,
    instrumentIndex: 2,
    itemIndex: 0,
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

    it('should pass its updateSelectedItem callback to the List component', () => {
      wrapper.find('.ConditionList')
        .find('List').props().onChange(2);

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call updateSelectedItem with an instrument index and item index', () => {
      wrapper.find('.ConditionList')
        .find('List').props().onChange(2);

      expect(spy).toHaveBeenCalledWith(0, 1);
    });
  });
});
