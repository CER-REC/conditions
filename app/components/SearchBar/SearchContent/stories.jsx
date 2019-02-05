import React from 'react';
import { forceReRender } from '@storybook/react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import SearchContent from '.';
import ReadMe from './README.md';

storiesForComponent('Components|SearchBar/SearchContent', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({
    state: {
      display: true, keywords: ['hello world', 'hi there'], exceptKeywords: ['safety', 'fire'],
    },
    actions: {
      closeTab: () => () => ({ display: false }),
      // NOTE: Storybook seems to have issue with re-rendering after state change

      deleteWord: state => (word) => {
        const { keywords } = state;
        const index = (keywords.indexOf(word) > -1) ? keywords.indexOf(word) : null;
        const updateKeywords = keywords;
        updateKeywords.splice(index, 1);
        forceReRender();
        return { keywords: updateKeywords };
      },
      addWord: state => (word) => {
        const { keywords: updateWords } = state;
        updateWords.push(word);
        forceReRender();
        return { keywords: updateWords };
      },
    },

  }))
  .add('default', () => (
    <SearchContent
      {...getInteractionProps()}
      keywords={getInteractionProps().keywords}
      exceptKeywords={getInteractionProps().exceptKeywords}
    />
  ));
