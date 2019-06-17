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
  },
  {
    binnedValue: 3,
    instrumentNumber: 'XO-001-2018',
    id: 1,
    fill: ['pink'],
    marked: true,
    instrumentIndex: 0,
    itemIndex: 0,
  },
  {
    binnedValue: 2,
    instrumentNumber: 'XO-001-2018',
    id: 2,
    fill: ['blue'],
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
    instrumentNumber: 'XO-003-2018',
    id: 4,
    fill: ['red'],
    instrumentIndex: 1,
    itemIndex: 0,
  },
  {
    binnedValue: 2,
    instrumentNumber: 'XO-003-2018',
    id: 5,
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
    instrumentNumber: 'XO-005-2018',
    id: 6,
    fill: ['orange'],
    marked: true,
    instrumentIndex: 2,
    itemIndex: 0,
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
      state: { selectedItem: { instrumentIndex: 0, itemIndex: -1 } },
      actions: { updateSelectedItem },
    },
  });
