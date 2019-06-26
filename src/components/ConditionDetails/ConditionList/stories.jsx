import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../../.storybook/utils';
import ConditionList from '.';
import ReadMe from './README.md';

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

const updateSelectedItem = () => (instrumentIndex, itemIndex) => (
  { instrumentIndex, itemIndex }
);

storiesForComponent('Components|ConditionDetails/ConditionList', module, ReadMe)
  .addDecorator(withInteraction({ actions: ['updateSelectedItem'] }))
  .add('default', () => (
    <ConditionList
      items={data}
      {...getInteractionProps()}
    />
  ), {
    interaction:
    {
      state: { selectedItem: 0 },
      actions: { updateSelectedItem },
    },
  });
