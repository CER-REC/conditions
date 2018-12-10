import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import LegendItem from './';
import ReadMe from './README.md';

storiesForComponent('Components|SmallMultiplesLegend/LegendItem', module, ReadMe)
  .add('basic usage', () => (
    <LegendItem
      title="Title"
      data={[{
        date: 2015,
        count: 1,
      }, {
        date: 2016,
        count: 2,
      }, {
        date: 2017,
        count: 3,
      }]}
    />
  ))
  .add('faded', () => (
    <LegendItem
      title="Another"
      data={[{
        date: 100,
        count: 5,
      }, {
        date: 200,
        count: 2,
      }, {
        date: 300,
        count: 55,
      }]}
      faded
    />
  ));
