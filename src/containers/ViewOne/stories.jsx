import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import withGQL from '../../../.storybook/addon-graphql';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import { ViewOneUnconnected, ViewOneGraphQL } from '.';

import keywords from '../../components/ConditionExplorer/mockKeywords';

const uniqueKeywords = keywords.filter((v, i) => keywords.indexOf(v) === i);

const noop = () => {};

storiesForView('Containers|ViewOne', module, ReadMe)
  .addDecorator(
    withInteraction({
      actions: {
        setSelectedKeywordId: () => keywordId => ({ selected: { keywordId } }),
      },
      state: {
        selected: {
          selectedKeywordId: null,
        },
      },
    }),
  )
  .add('default', () => (
    <ViewOneUnconnected
      keywords={uniqueKeywords}
      jumpToAbout={noop}
      {...getInteractionProps()}
    />
  ))
  .add('connected variant', () => (
    <ViewOneGraphQL
      jumpToAbout={noop}
      {...getInteractionProps()}
    />
  ), { decorators: [withGQL] })
  .add('layout only', () => (
    <ViewOneUnconnected
      layoutOnly
      keywords={uniqueKeywords}
      jumpToAbout={noop}
      {...getInteractionProps()}
    />
  ));
