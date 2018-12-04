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
        conditions: [{
          date: new Date('2018-01-01T00:00:00.000Z'),
          number: 1,
        }, {
          date: new Date('2018-02-01T00:00:00.000Z'),
          number: 2,
        }, {
          date: new Date('2018-03-01T00:00:00.000Z'),
          number: 3,
        }],
      }, {
        id: 'Item Title 2',
        conditions: [{
          date: new Date('2018-01-01T00:00:00.000Z'),
          number: 43,
        }, {
          date: new Date('2018-02-01T00:00:00.000Z'),
          number: 22,
        }, {
          date: new Date('2018-03-01T00:00:00.000Z'),
          number: 56,
        }],
      }, {
        id: 'Item Title 3',
        conditions: [{
          date: new Date('2018-01-11T00:00:00.000Z'),
          number: 5,
        }, {
          date: new Date('2018-03-03T00:00:00.000Z'),
          number: 5,
        }],
      }]}
      onChange={id => alert(id)}
    />
  ));
