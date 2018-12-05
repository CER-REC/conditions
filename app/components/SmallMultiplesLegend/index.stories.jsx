import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import SmallMultiplesLegend from './';
import ReadMe from './README.md';

storiesForComponent('Components|SmallMultiplesLegend', module, ReadMe)
  .add('basic usage', () => (
    <SmallMultiplesLegend
      title="Title"
      data={[{
        id: 'Item Title 1',
        graphData: [{
          date: 2018,
          count: 1,
        }, {
          date: 2019,
          count: 2,
        }, {
          date: 2020,
          count: 3,
        }],
      }, {
        id: 'Item Title 2',
        graphData: [{
          date: 2018,
          count: 43,
        }, {
          date: 2019,
          count: 22,
        }, {
          date: 2020,
          count: 56,
        }],
      }, {
        id: 'Item Title 3',
        graphData: [{
          date: 2018,
          count: 5,
        }, {
          date: 2020,
          count: 5,
        }],
      }]}
      onChange={id => alert(id)}
    />
  ))
  .add('highlight', () => (
    <SmallMultiplesLegend
      title="Title abc"
      data={[{
        id: 'SomeTitle',
        graphData: [{
          date: 1997,
          count: 123,
        }, {
          date: 1998,
          count: 563,
        }, {
          date: 1999,
          count: 32,
        }],
      }, {
        id: 'Highlight this',
        graphData: [{
          date: 1997,
          count: 97,
        }, {
          date: 1999,
          count: 56,
        }],
      }]}
      onChange={id => alert(id)}
      highlightID="Highlight this"
    />
  ));
