import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import LegendItem from '.';
import ReadMe from './README.md';
import { conditionCountsByYear } from '../../../mockData';
import { features } from '../../../constants';

const generateProps = data => ({
  feature: data.feature,
  subFeature: data.subFeature,
  color: features[data.feature][data.subFeature],
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
      feature="filing"
      subFeature="REQUIRED"
      color={features.filing.REQUIRED}
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
