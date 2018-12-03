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
    id: 'themeTwo',
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
  .add('With values', () => (
    <Streamgraph
      projectData={projectData}
    />
  ));
