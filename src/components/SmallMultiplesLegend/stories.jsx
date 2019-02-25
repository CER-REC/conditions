import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import SmallMultiplesLegend from '.';
import ReadMe from './README.md';
import { conditionCountsByYear } from '../../mockData';

const selectedOptions = conditionCountsByYear.counts
  .reduce((acc, next) => ({
    ...acc,
    [next.subfeature]: next.subfeature,
  }), { All: '' });
const highlightOptions = conditionCountsByYear.counts
  .reduce((acc, next) => ({
    ...acc,
    [next.subfeature]: next.subfeature,
  }), { All: '' });

storiesForComponent('Components|SmallMultiplesLegend', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withKnobs)
  .add('basic usage', () => (
    <SmallMultiplesLegend
      title="theme"
      data={conditionCountsByYear.counts}
      onChange={name => alert(name)}
    />
  ))
  .add('selected', () => (
    <SmallMultiplesLegend
      title="theme"
      data={conditionCountsByYear.counts}
      onChange={name => alert(name)}
      selected={select('Selected', selectedOptions, Object.keys(selectedOptions)[1])}
    />
  ))
  .add('highlight', () => (
    <SmallMultiplesLegend
      title="theme"
      data={conditionCountsByYear.counts}
      onChange={name => alert(name)}
      highlightName={select('Highlight', highlightOptions, Object.keys(highlightOptions)[1])}
    />
  ));
