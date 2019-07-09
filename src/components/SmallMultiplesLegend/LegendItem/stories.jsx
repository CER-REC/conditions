import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import LegendItem from '.';
import ReadMe from './README.md';
import { features } from '../../../constants';

const props = {
  feature: 'filing',
  subFeature: 'REQUIRED',
  color: features.filing.REQUIRED,
  data: [
    { x: 2010, y: 316 },
    { x: 2011, y: 827 },
    { x: 2012, y: 421 },
    { x: 2013, y: 108 },
    { x: 2014, y: 236 },
    { x: 2015, y: 312 },
    { x: 2016, y: 2311 },
    { x: 2017, y: 175 },
    { x: 2018, y: 343 },
  ],
  max: 2311,
};

storiesForComponent('Components|SmallMultiplesLegend/LegendItem', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('basic usage', () => <LegendItem {...props} />)
  .add('all', () => <LegendItem {...props} all />)
  .add('faded', () => <LegendItem {...props} faded />);
