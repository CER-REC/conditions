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
    fill: ['pink'],
    marked: true,
    instrumentIndex: 0,
    itemIndex: 0,
  },
  {
    binnedValue: 2,
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

const updateSelectedItem = () => (instrumentIndex, itemIndex) => {
  const idx = data.findIndex(item => (
    item.instrumentIndex === instrumentIndex
    && item.itemIndex === itemIndex
  ));

  return { selectedItem: idx };
};

storiesForComponent('Components|ConditionDetails/ConditionList', module, ReadMe)
  .addDecorator(withInteraction({ actions: ['updateSelectedItem'] }))
  .add('default', () => (
    <ConditionList
      items={data}
      selectedItem={3}
      {...getInteractionProps()}
    />
  ), { interaction: { actions: { updateSelectedItem } } });
