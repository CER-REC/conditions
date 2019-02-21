import React from 'react';
import { storiesForComponent } from '../../../../../.storybook/utils';
import KeywordList from '.';
import ReadMe from './README.md';

const suggestedKeywords = [{
  name: 'safety',
  conditions: 1200,
},
{
  name: 'emissions',
  conditions: 1000,
}, {
  name: 'habitat',
  conditions: 800,
},
{
  name: 'construction',
  conditions: 1000,
},
{
  name: 'habitat',
  conditions: 1000,
},
{
  name: 'file',
  conditions: 1400,
},
{
  name: 'breeding breed',
  conditions: 380,
},
{
  name: 'safety',
  conditions: 1400,
},
{
  name: 'emissions',
  conditions: 1800,
}, {
  name: 'habitat',
  conditions: 1400,
},
{
  name: 'construction',
  conditions: 1001,
},
{
  name: 'habitat',
  conditions: 1300,
},
{
  name: 'file',
  conditions: 1420,
},
{
  name: 'breeding breed',
  conditions: 390,
}];

const selectedWords = [
  {
    name: 'safety',
    conditions: 1200,
  },
];
const noop = () => {};

storiesForComponent('Components|SearchBar/SuggestedKeywordsPopout/KeywordList', module, ReadMe)
  .add('default', () => (
    <KeywordList
      selectedWords={selectedWords}
      suggestedKeywords={suggestedKeywords}
      onClickUpdate={noop}
    />
  ));
