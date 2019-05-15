import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import KeywordExplorerButton from '.';
import ReadMe from './README.md';
import { conditionCountsByYear, conditionCountsByCommodity } from '../../mockData';

storiesForComponent('Components|KeywordExplorerButton', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({ actions: ['onClick'] }))
  .add('Default Keyword Explore Button', () => (
    <KeywordExplorerButton
      {...getInteractionProps()}
    />
  ));
