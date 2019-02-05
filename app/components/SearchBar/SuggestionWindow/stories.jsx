import React from 'react';
import { forceReRender } from '@storybook/react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import SuggestionWindow from '.';
import ReadMe from './README.md';

storiesForComponent('Components|SearchBar/SuggestionWindow', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({
    state: {
      display: true, keywords: ['hello world', 'hi there'],
    },
    actions: {
      closeTab: () => () => ({ display: false }),
      // NOTE: Storybook seems to have issue with re-rendering after state change
      deleteWord: state => (word) => {
        return { keywords: word };
      },
    },

  }))
  .add('default', () => (
    <SuggestionWindow
      {...getInteractionProps()}
      keywords={getInteractionProps().keywords}
    />
  ));
