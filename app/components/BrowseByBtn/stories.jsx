import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import BrowseByBtn from '.';
import ReadMe from './README.md';

storiesForComponent('Components|BrowseByBtn', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({ actions: ['onClick'] }))
  .add('with state toggle', () => (
    <BrowseByBtn
      {...getInteractionProps()}
      mode={getInteractionProps().mode === 'company' ? 'location' : 'company'}
    />
  ), { interaction: { actions: { onClick: () => mode => ({ mode }) }, state: { mode: 'company' } } })
  .add('browseByCompany', () => (
    <BrowseByBtn
      mode="company"
      {...getInteractionProps()}
    />
  ))
  .add('browseByLocation', () => (
    <BrowseByBtn
      mode="location"
      {...getInteractionProps()}
    />
  ));

