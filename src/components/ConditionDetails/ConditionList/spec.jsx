import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

import ConditionList from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

const data = [
  {
    isInstrument: true,
    instrumentNumber: 'XO-001-2018',
    instrumentIndex: 0,
    itemIndex: -1,
  },
  {
    length: 3,
    fill: 'pink',
    marked: true,
    instrumentIndex: 0,
    itemIndex: 0,
  },
  {
    length: 2,
    fill: 'blue',
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
    length: 1,
    fill: 'red',
    instrumentIndex: 1,
    itemIndex: 0,
  },
  {
    length: 2,
    fill: 'red',
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
    length: 3,
    fill: 'orange',
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

    xit('should call its updateSelectedItem callback', () => {
      // I can't figure out how to simulate this without digging into the List
      // component itself. :(
    });
  });
});
