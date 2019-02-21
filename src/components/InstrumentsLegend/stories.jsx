import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import InstrumentsLegend from '.';
import ReadMe from './README.md';

const categories = ['OPENING', 'ABANDONMENT', 'SAFETY', 'TARIFFS', 'MISC'];
const data = [{
  parentName: 'OIL',
  children: [{
    category: categories[0],
  }, {
    category: categories[1],
  }, {
    category: categories[4],
  }],
}, {
  parentName: 'GAS',
  children: [{
    category: categories[0],
  }, {
    category: categories[1],
  }, {
    category: categories[2],
  }, {
    category: categories[3],
  }, {
    category: categories[4],
  }],
}, {
  parentName: 'POWER',
  children: [{
    category: categories[0],
  }, {
    category: categories[3],
  }, {
    category: categories[0],
  }],
}, {
  parentName: 'NOT_SPECIFIED',
  children: [{
    category: categories[0],
  }],
}];

const selectedOptions = categories.reduce((hashAggregate, category) => ({
  ...hashAggregate,
  [category]: category,
}), { All: '' });

storiesForComponent('Components|InstrumentsLegend', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withKnobs)
  .add('basic usage', () => (
    <InstrumentsLegend
      data={[{
        parentName: 'ANY_COMMODITY_TYPES',
        children: [{
          category: 'ROUTING',
        }, {
          category: 'CONSTRUCTION',
        }],
      }]}
      onChange={name => alert(name)}
    />
  ))
  .add('selected', () => (
    <InstrumentsLegend
      data={data}
      onChange={name => alert(name)}
      selected={select('Selected', selectedOptions, 'B')}
    />
  ));
