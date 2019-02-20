import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../../.storybook/utils';
import ConditionList from '.';
import ReadMe from './README.md';

import data from '../testData';

const openIntermediatePopup = instrumentNumber => alert(`Intermediate popup for: ${instrumentNumber}`);

const defaultProps = {
  instrument: data[0],
  openIntermediatePopup,
  itemIndex: 0,
};

storiesForComponent('Components|ConditionDetails/Content', module, ReadMe)
  .addDecorator(withInteraction({ actions: ['openIntermediatePopup'] }))
  .add('condition selected', () => (
    <div style={{ width: 450, height: 300, overflow: 'scroll' }}>
      <ConditionList
        {...defaultProps}
        {...getInteractionProps()}
      />
    </div>
  ), { interaction: { actions: { openIntermediatePopup } } })
  .add('instrument selected', () => (
    <div style={{ width: 450, height: 300, overflow: 'scroll' }}>
      <ConditionList
        {...defaultProps}
        itemIndex={-1}
        {...getInteractionProps()}
      />
    </div>
  ), { interaction: { actions: { openIntermediatePopup } } });
