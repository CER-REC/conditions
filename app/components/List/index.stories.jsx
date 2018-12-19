import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status/';
import List from './';
import ReadMe from './README.md';

storiesForComponent('Components|List', module, ReadMe)
  .addDecorator(withStatus('designUnderDevelopment'))
  .add('basic usage', () => (
    <List
      items={['Item 1', 'Item 2', 'Item 3']}
      onChange={v => alert(v)}
    />
  ))
  .add('selected', () => (
    <List
      items={['Item 1', 'Item 2', 'Item 3']}
      selected={1}
      onChange={v => alert(v)}
    />
  ))
  .add('component items', () => (
    <List
      items={[
        <strong key="strong">Strong</strong>,
        <em key="em">Emphasis</em>,
        <div key="div" style={{ width: 50, height: 50, background: 'red' }} />,
      ]}
      onChange={v => alert(v)}
    />
  ))
  .add('itemInteractions', () => (
    <List
      items={['Item 1', 'Item 2', 'Item 3']}
      onChange={v => alert(v)}
      itemInteractions={false}
    />
  ))
  .add('horizontal', () => (
    <List
      items={['Item 1', 'Item 2', 'Item 3']}
      onChange={() => {}}
      horizontal
    />
  ), {
    status: {
      name: 'functionalityUnderDevelopment',
      note: 'Horizontal support has not been implemented yet',
    },
  });
