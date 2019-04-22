import React from 'react';
import withGQL from '../../../.storybook/addon-graphql';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import { ViewOneUnconnected, ViewOneGraphQL } from '.';

import keywords from '../../components/ConditionExplorer/mockKeywords';

const uniqueKeywords = keywords.filter((v, i) => keywords.indexOf(v) === i);

const noop = () => {};

const storyProps = {
  selected: { keywordId: null },
  setSelectedKeywordId: noop,
};
storiesForView('Containers|ViewOne', module, ReadMe)
  .add('default', () => (
    <ViewOneUnconnected
      keywords={uniqueKeywords}
      jumpToAbout={noop}
      {...storyProps}
    />
  ))
  .add(
    'connected variant', () => <ViewOneGraphQL jumpToAbout={noop} {...storyProps} />,
    { decorators: [withGQL] },
  )
  .add('layout only', () => <ViewOneUnconnected layoutOnly keywords={uniqueKeywords} jumpToAbout={noop} {...storyProps} />);
