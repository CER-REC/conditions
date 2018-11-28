import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import Streamgraph from './';
import ReadMe from './README.md';

const projectData = [
  {
    id: 'themeOne',
    color: 'pink',
    graphData: [
      { date: 2010, count: 0 },
      { date: 2011, count: 120 },
      { date: 2012, count: 230 },
      { date: 2013, count: 340 },
      { date: 2014, count: 550 },
      { date: 2015, count: 760 },
      { date: 2016, count: 1220 },
      { date: 2017, count: 1436 },
    ],
  },
  {
    id: 'themeTwo',
    color: 'blue',
    graphData: [
      { date: 2010, count: 0 },
      { date: 2011, count: 230 },
      { date: 2012, count: 340 },
      { date: 2013, count: 410 },
      { date: 2014, count: 770 },
      { date: 2015, count: 820 },
      { date: 2016, count: 990 },
      { date: 2017, count: 1270 },
    ],
  },
  {
    id: 'themeThree',
    color: 'orange',
    graphData: [
      { date: 2010, count: 140 },
      { date: 2011, count: 340 },
      { date: 2012, count: 456 },
      { date: 2013, count: 650 },
      { date: 2014, count: 830 },
      { date: 2015, count: 954 },
      { date: 2016, count: 1240 },
      { date: 2017, count: 1411 },
    ],
  },
];

storiesForComponent('Components|Streamgraph', module, ReadMe)
  .add('No props', () => (
    <Streamgraph
      projectData={[]}
    />
  ))
  .add('With values', () => (
    <Streamgraph
      projectData={projectData}
    />
  ));
