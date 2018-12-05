import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import StreamLayer from './';
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
      { date: 2016, count: 120 },
      { date: 2017, count: 46 },
    ],
  },
];

storiesForComponent('Components|StreamLayer', module, ReadMe)
  .add('With data', () => (
    <StreamLayer
      projectData={projectData}
    />
  ));
