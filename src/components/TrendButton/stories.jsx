import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import TrendButton from '.';
import ReadMe from './README.md';
import d3HierarchyCalculation from '../BubbleChart/d3HierarchyCalculation';
import { conditionCountsByYear } from '../../mockData';

const instrumentData = {
  name: 'data',
  children: [{
    parentName: 'anyCommodityTypes',
    children: [
      {
        name: '1',
        children: [],
        value: 15,
        category: 'construction',
      }, {
        name: '2',
        children: [],
        value: 15,
        category: 'misc',
      }, {
        name: '3',
        children: [],
        value: 15,
        category: 'tariffs',
      }],
  }],
};

storiesForComponent('Components|TrendButton', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({ actions: ['onClick'] }))
  .add('Default StreamGraph Button', () => (
    <TrendButton
      {...getInteractionProps()}
      feature="theme"
      subFeature=""
      projectData={conditionCountsByYear.counts}
      instrumentData={d3HierarchyCalculation(
        instrumentData,
        120,
        50,
      )}
    />
  ))
  .add('Instrument Bubble Button', () => (
    <TrendButton
      {...getInteractionProps()}
      feature="instrument"
      subFeature=""
      projectData={conditionCountsByYear.counts}
      instrumentData={d3HierarchyCalculation(
        instrumentData,
        120,
        50,
      )}
    />
  ));
