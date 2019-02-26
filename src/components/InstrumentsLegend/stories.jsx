import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import { conditionCountsByCommodity } from '../../mockData';
import InstrumentsLegend from '.';
import ReadMe from './README.md';

const categories = ['OPENING', 'ABANDONMENT', 'SAFETY', 'TARIFFS', 'MISC'];
const data = conditionCountsByCommodity.counts;

const selectedOptions = categories.reduce((hashAggregate, category) => ({
  ...hashAggregate,
  [category]: category,
}), { All: '' });

storiesForComponent('Components|InstrumentsLegend', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withKnobs)
  .add('basic usage', () => (
    <InstrumentsLegend
      data={conditionCountsByCommodity.counts}
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
