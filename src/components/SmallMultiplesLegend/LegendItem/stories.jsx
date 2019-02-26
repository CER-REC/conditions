import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import LegendItem from '.';
import ReadMe from './README.md';
import { conditionCountsByYear } from '../../../mockData';

const generateProps = data => ({
  feature: data.feature,
  title: data.subFeature,
  data,
  max: Math.max(...Object.values(data.years)),
});

storiesForComponent('Components|SmallMultiplesLegend/LegendItem', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('basic usage', () => (
    <LegendItem
      {...generateProps(conditionCountsByYear.counts[0])}
    />
  ))
  .add('all', () => (
    <LegendItem
      title="filing"
      feature="filing"
      max={0}
      all
    />
  ))
  .add('faded', () => (
    <LegendItem
      {...generateProps(conditionCountsByYear.counts[2])}
      faded
    />
  ));
