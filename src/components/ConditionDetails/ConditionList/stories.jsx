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
    conditionId: undefined,
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
    conditionId: undefined,
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
    conditionId: undefined,
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

storiesForComponent('Components|ConditionDetails/ConditionList', module, ReadMe)
  .addDecorator(withInteraction({
    state: { selectedCondition: -1, selectedInstrument: -1 },
    actions: {
      updateSelectedInstrument: () => id => ({ selectedInstrument: id, selectedCondition: -1 }),
      updateSelectedCondition: () => id => ({ selectedInstrument: -1, selectedCondition: id }),
    },
  }))
  .add('default', () => (
    <ConditionList
      items={data}
      selectedItem={3}
      counts={{
        conditions: 20,
        instruments: 3,
      }}
      {...getInteractionProps()}
    />
  ));
