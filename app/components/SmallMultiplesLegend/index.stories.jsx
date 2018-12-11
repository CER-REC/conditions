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
          count: 30,
        }, {
          date: 2020,
          count: 20,
        }, {
          date: 2021,
          count: 84,
        }, {
          date: 2022,
          count: 3,
        }],
        color: 'red',
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
        }, {
          date: 2021,
          count: 1,
        }, {
          date: 2022,
          count: 56,
        }],
        color: 'blue',
      }, {
        id: 'Item Title 3',
        graphData: [{
          date: 2018,
          count: 5,
        }, {
          date: 2022,
          count: 5,
        }],
        color: 'green',
      }, {
        id: 'Item Title 5',
        graphData: [{
          date: 2018,
          count: 46,
        }, {
          date: 2022,
          count: 4,
        }],
        color: 'yellow',
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
        color: '#AA11AA',
      }, {
        id: 'Highlight this',
        graphData: [{
          date: 1997,
          count: 97,
        }, {
          date: 1999,
          count: 56,
        }],
        color: '#11AA11',
      }]}
      onChange={id => alert(id)}
      highlightID="Highlight this"
    />
  ));
