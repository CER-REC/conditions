import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import List from '.';
import ReadMe from './README.md';

storiesForComponent('Components|List', module, ReadMe)
  .addDecorator(withInteraction({ actions: ['onChange'] }))
  .addDecorator(withStatus('designUnderDevelopment'))
  .add('basic usage', () => (
    <List
      items={['Item 1', 'Item 2', 'Item 3']}
      {...getInteractionProps()}
    />
  ), {
    interaction: {
      state: { selected: 0 },
      actions: { onChange: () => v => ({ selected: v }) },
    },
  })
  .add('selected', () => (
    <List
      items={['Item 1', 'Item 2', 'Item 3']}
      selected={1}
      {...getInteractionProps()}
    />
  ))
  .add('component items', () => (
    <List
      items={[
        <strong key="strong">Strong</strong>,
        <em key="em">Emphasis</em>,
        <div key="div" style={{ width: 50, height: 50, background: 'red' }} />,
      ]}
      selected={0}
      {...getInteractionProps()}
    />
  ))
  .add('itemInteractions', () => (
    <List
      items={['Item 1', 'Item 2', 'Item 3']}
      selected={0}
      itemInteractions={false}
      {...getInteractionProps()}
    />
  ))
  .add('horizontal', () => (
    <List
      items={['Item 1', 'Item 2', 'Item 3']}
      selected={0}
      horizontal
      {...getInteractionProps()}
    />
  ))
  .add('guide line', () => (
    <List
      items={['Item 1', 'Item 2', 'Item 3']}
      selected={0}
      guideLine
      {...getInteractionProps()}
    />
  ))
  .add('arrows at edges', () => (
    <List
      items={['Item 1', 'Item 2', 'Item 3']}
      selected={1}
      arrowsAtEdges
      {...getInteractionProps()}
    />
  ))
  .add('arrows at edges horizontal', () => (
    <List
      items={['Item 1', 'Item 2', 'Item 3']}
      selected={1}
      arrowsAtEdges
      horizontal
      {...getInteractionProps()}
    />
  ));
