import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import ConditionExplorer from '.';
import ReadMe from './README.md';
import keywords from './mockKeywords';

const uniqueKeywords = keywords.filter((v, i) => keywords.indexOf(v) === i);

const noop = () => {};

storiesForComponent('Components|ConditionExplorer', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(
    withInteraction({
      actions: {
        setSelectedKeywordId: () => keywordId => ({ selectedKeywordId: keywordId }),
      },
      state: {
        selectedKeywordId: -1,
      },
    }),
  )
  .add('default', () => (
    <ConditionExplorer
      keywords={uniqueKeywords}
      setSelectedKeyword={noop}
      beginTutorial={noop}
      {...getInteractionProps()}
    />
  ))
  .add('physics disabled', () => (
    <ConditionExplorer
      keywords={uniqueKeywords}
      setSelectedKeyword={noop}
      beginTutorial={noop}
      physics={false}
      {...getInteractionProps()}
    />
  ));
