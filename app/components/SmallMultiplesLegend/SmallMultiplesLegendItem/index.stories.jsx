import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import SmallMultiplesLegendItem from './';
import ReadMe from './README.md';

storiesForComponent('Components|SmallMultiplesLegend/SmallMultiplesLegendItem', module, ReadMe)
  .add('basic usage', () => (
    <SmallMultiplesLegendItem
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
  ));
