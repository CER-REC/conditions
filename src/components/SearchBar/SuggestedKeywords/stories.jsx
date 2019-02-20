import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import SuggestedKeywords from '.';
import ReadMe from './README.md';

storiesForComponent('Components|SearchBar/SuggestedKeywords', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({ actions: ['onClick'] }))
  .add('default', () => (
    <SuggestedKeywords {...getInteractionProps()} />
  ));
