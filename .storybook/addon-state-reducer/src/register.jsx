import React from 'react';
import addons from '@storybook/addons';
import Panel from './Panel';

addons.register('storybook-addon-state-reducer', (api) => {
  const channel = addons.getChannel();
  addons.addPanel('storybook-addon-state-reducer/panel', {
    title: 'Interaction Feedback',
    // eslint-disable-next-line react/prop-types
    render: ({ active }) => <Panel channel={channel} api={api} active={active} />,
  });
});
