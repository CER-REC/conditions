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
      display: true, keywords: ['pipeline', 'pipeline2'], exceptKeywords: ['safety', 'fire'], mode: 'basic',
    },
    actions: {
      closeTab: () => () => ({ display: false }),
      // NOTE: Storybook seems to have issue with re-rendering after state change
      changeSearchType: state => () => {
        const mode = (state.mode === 'basic') ? 'advanced' : 'basic';
        forceReRender();
        return ({ mode });
      },
      deleteWord: state => (wordObject) => {
        const [word, type] = wordObject;
        if (type === 'include') {
          const { keywords } = state;
          const index = (keywords.indexOf(word) > -1) ? keywords.indexOf(word) : null;
          keywords.splice(index, 1);
          forceReRender();
          return ({ keywords });
        }
        const { exceptKeywords } = state;
        const exceptIndex = (exceptKeywords.indexOf(word) > -1)
          ? exceptKeywords.indexOf(word)
          : null;
        exceptKeywords.splice(exceptIndex, 1);
        forceReRender();
        return ({ exceptKeywords });
      },
      addWord: state => (word, type) => {
        const { keywords, exceptKeywords } = state;
        if (type === 'include') {
          if (word.length === 0
            || keywords.length === 6
            || keywords.indexOf(word) > -1
            || exceptKeywords.indexOf(word) > -1) { return ({ keywords }); }
          keywords.push(word);
          forceReRender();
          return ({ keywords });
        }
        if (word.length === 0
          || exceptKeywords.length === 6
          || exceptKeywords.indexOf(word) > -1
          || keywords.indexOf(word) > -1) { return ({ exceptKeywords }); }
        exceptKeywords.push(word);
        forceReRender();
        return ({ exceptKeywords });
      },
    },

  }))
  .add('with interaction', () => (
    <SearchContent
      {...getInteractionProps()}
      keywords={getInteractionProps().keywords}
      exceptKeywords={getInteractionProps().exceptKeywords}
    />
  ));
