import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import InstrumentsLegend from '.';
import ReadMe from './README.md';

const categories = ['C1', 'C2', 'C3', 'C4', 'C5'];
const colors = ['purple', '#A1C1B1', 'blue', '#16AA16', '#00FFFF'];
const data = [{
  parentName: 'Indicator',
  children: [{
    category: categories[0],
    color: colors[0],
  }, {
    category: categories[1],
    color: colors[1],
  }, {
    category: categories[4],
    color: colors[4],
  }],
}, {
  parentName: 'Ind',
  children: [{
    category: categories[0],
    color: colors[0],
  }, {
    category: categories[1],
    color: colors[1],
  }, {
    category: categories[2],
    color: colors[2],
  }, {
    category: categories[3],
    color: colors[3],
  }, {
    category: categories[4],
    color: colors[4],
  }],
}, {
  parentName: 'Type',
  children: [{
    category: categories[0],
    color: colors[0],
  }, {
    category: categories[3],
    color: colors[3],
  }, {
    category: categories[0],
    color: colors[0],
  }],
}, {
  parentName: 'N/A',
  children: [{
    category: categories[0],
    color: colors[0],
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
        parentName: 'Indicator',
        children: [{
          category: 'Cat. 1',
          color: 'red',
        }, {
          category: 'Cat. 2',
          color: '#123456',
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
