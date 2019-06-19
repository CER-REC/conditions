import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../../.storybook/utils';
import Content from '.';
import ReadMe from './README.md';

import { conditionData } from '../../../mockData';

const openIntermediatePopup = () => (instrumentNumber) => {
  alert(`Intermediate popup for: ${instrumentNumber}`);
};

const defaultProps = {
  instrument: conditionData[0],
  openIntermediatePopup,
  itemIndex: 0,
  includedKeywords: ['program', 'hello'],
};

storiesForComponent('Components|ConditionDetails/Content', module, ReadMe)
  .addDecorator(withInteraction({ actions: ['openIntermediatePopup'] }))
  .add('condition selected', () => (
    <Content
      {...defaultProps}
      {...getInteractionProps()}
    />
  ), { interaction: { actions: { openIntermediatePopup } } })
  .add('instrument selected', () => (
    <Content
      {...defaultProps}
      itemIndex={-1}
      {...getInteractionProps()}
    />
  ), { interaction: { actions: { openIntermediatePopup } } });
