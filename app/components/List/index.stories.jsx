import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import List from '.';
import ReadMe from './README.md';

storiesForComponent('Components|List', module, ReadMe)
  .addDecorator(withInteraction({
    state: {
      selected: 0,
    },
    actions: {
      onChange: () => v => ({ selected: v }),
    },
  }))
  .addDecorator(withStatus('designUnderDevelopment'))
  .add('basic usage', () => (
    <List
      items={['Item 1', 'Item 2', 'Item 3']}
      {...getInteractionProps()}
    />
  ))
  .add('selected', () => (
    <List
      items={['Item 1', 'Item 2', 'Item 3']}
      {...getInteractionProps()}
    />
  ), { interaction: { state: { selected: 1 } } })
  .add('component items', () => (
    <List
      items={[
        <strong key="strong">Strong</strong>,
        <em key="em">Emphasis</em>,
        <div key="div" style={{ width: 50, height: 50, background: 'red' }} />,
      ]}
      {...getInteractionProps()}
    />
  ))
  .add('itemInteractions', () => (
    <List
      items={['Item 1', 'Item 2', 'Item 3']}
      itemInteractions={false}
      {...getInteractionProps()}
    />
  ))
  .add('horizontal', () => (
    <List
      items={['Item 1', 'Item 2', 'Item 3']}
      horizontal
      {...getInteractionProps()}
    />
  ))
  .add('guide line', () => (
    <List
      items={['Item 1', 'Item 2', 'Item 3']}
      guideLine
      {...getInteractionProps()}
    />
  ));
