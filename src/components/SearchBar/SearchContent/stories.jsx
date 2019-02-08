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
      keywords: ['pipeline', 'pipeline2'], exceptKeywords: ['safety', 'fire'], mode: 'basic',
    },
    actions: {
      // NOTE: Storybook seems to have issue with re-rendering after state change
      changeSearchType: state => () => {
        const mode = (state.mode === 'basic') ? 'advanced' : 'basic';
        forceReRender();
        return ({ mode });
      },
      updateKeywords: () => (obj) => {
        const [words, type] = obj;
        if (type === 'include') {
          forceReRender();
          return ({ keywords: words });
        }
        forceReRender();
        return ({ exceptKeywords: words });
      },
    },
  }))
  .add('with interaction', () => (
    <SearchContent
      {...getInteractionProps()}
      closeTab={() => alert('clicked')}
    />
  ));
