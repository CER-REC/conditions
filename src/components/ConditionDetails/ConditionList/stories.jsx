import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../../.storybook/utils';
import ConditionList from '.';
import ReadMe from './README.md';

import data from '../testData';

const updateSelectedItem = () => (instrumentIndex, itemIndex) => (
  { selectedItem: { instrumentIndex, itemIndex } }
);

const defaultProps = {
  data,
  searchKeywords: {
    include: ['hello'],
  },
  selectedItem: { instrumentIndex: 1, itemIndex: -1 },
};

storiesForComponent('Components|ConditionDetails/ConditionList', module, ReadMe)
  .addDecorator(withInteraction({ actions: ['updateSelectedItem'] }))
  .add('default', () => (
    <ConditionList
      {...defaultProps}
      {...getInteractionProps()}
    />
  ), { interaction: { actions: { updateSelectedItem } } });
