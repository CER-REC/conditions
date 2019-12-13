import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import ConditionExplorer from '.';
import ReadMe from './README.md';
import keywords from './mockKeywords.json';

const uniqueKeywords = keywords.filter((v, i) => keywords.indexOf(v) === i);

const noop = () => {};

storiesForComponent('Components|ConditionExplorer', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(
    withInteraction({
      actions: {
        // TODO: There is a bug with the story implementation that causes the
        // browser to lock up
        // TODO: Implement the same action and crash-fix to ViewOne story
        setSelectedKeyword: () => keywordId => ({ selectedKeywordId: keywordId.body.id }),
      },
      state: {
        selectedKeywordId: -1,
      },
    }),
  )
  .add('default', () => (
    <ConditionExplorer
      keywords={uniqueKeywords}
      beginTutorial={noop}
      {...getInteractionProps()}
    />
  ))
  .add('physics disabled', () => (
    <ConditionExplorer
      keywords={uniqueKeywords}
      beginTutorial={noop}
      physics={false}
      {...getInteractionProps()}
    />
  ));
