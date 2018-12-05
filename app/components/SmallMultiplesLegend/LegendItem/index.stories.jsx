import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import LegendItem from './';
import ReadMe from './README.md';

storiesForComponent('Components|SmallMultiplesLegend/LegendItem', module, ReadMe)
  .add('basic usage', () => (
    <LegendItem
      title="Title"
      data={[{
        date: new Date('2018-01-01T00:00:00.000Z'),
        number: 1,
      }, {
        date: new Date('2018-02-01T00:00:00.000Z'),
        number: 2,
      }, {
        date: new Date('2018-03-01T00:00:00.000Z'),
        number: 3,
      }]}
    />
  ))
  .add('unhighlight', () => (
    <LegendItem
      title="Another"
      data={[{
        date: new Date('2018-01-01T00:00:00.000Z'),
        number: 5,
      }, {
        date: new Date('2018-05-11T00:00:00.000Z'),
        number: 2,
      }, {
        date: new Date('2018-12-05T00:00:00.000Z'),
        number: 55,
      }]}
      unhighlight
    />
  ));
