import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import BrowseByBtn from '.';
import ReadMe from './README.md';

const testFn = () => ({
  message: 'Greetings from the test function',
});

storiesForComponent('Components|BrowseByBtn', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({ actions: { onClick: () => testFn } }))
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

