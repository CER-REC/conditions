import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import Streamgraph from '.';
import ReadMe from './README.md';

const chartTitle = 'Themes Across All Conditions';
const projectData = [
  {
    name: 'themeOne',
    key: 2420,
    color: 'pink',
    graphData: [
      { date: 2010, count: 0 },
      { date: 2011, count: 12 },
      { date: 2012, count: 23 },
      { date: 2013, count: 30 },
      { date: 2014, count: 150 },
      { date: 2015, count: 260 },
      { date: 2016, count: 445 },
      { date: 2017, count: 436 },
    ],
  },
  {
    name: 'themeTwo',
    key: 2420,
    color: 'blue',
    graphData: [
      { date: 2010, count: 11 },
      { date: 2011, count: 23 },
      { date: 2012, count: 34 },
      { date: 2013, count: 41 },
      { date: 2014, count: 77 },
      { date: 2015, count: 82 },
      { date: 2016, count: 99 },
      { date: 2017, count: 120 },
    ],
  },
  {
    name: 'themeThree',
    key: 2420,
    color: 'orange',
    graphData: [
      { date: 2010, count: 14 },
      { date: 2011, count: 30 },
      { date: 2012, count: 46 },
      { date: 2013, count: 65 },
      { date: 2014, count: 83 },
      { date: 2015, count: 95 },
      { date: 2016, count: 140 },
      { date: 2017, count: 11 },
    ],
  },
];

storiesForComponent('Components|StreamGraph', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('With values', () => (
    <Streamgraph
      projectData={projectData}
      chartTitle={chartTitle}
    />
  ));
