import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import LegendItem from './';
import ReadMe from './README.md';

storiesForComponent('Components|SmallMultiplesLegend/LegendItem', module, ReadMe)
  .addDecorator(storyFn => <div className="SmallMultiplesLegend">{storyFn()}</div>)
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
      color="green"
      max={5}
    />
  ))
  .add('all', () => (
    <LegendItem
      title="Title"
      data={[]}
      color=""
      max={0}
      all
    />
  ))
  .add('faded', () => (
    <LegendItem
      title="Another"
      data={[{
        date: 2000,
        count: 5,
      }, {
        date: 2001,
        count: 2,
      }, {
        date: 2002,
        count: 55,
      }]}
      color="#D1057A"
      max={55}
      faded
    />
  ));
