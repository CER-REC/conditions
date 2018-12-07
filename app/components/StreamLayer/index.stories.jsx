import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import StreamLayer from './';
import ReadMe from './README.md';

const projectId = 'themeNumber';
const projectColor = 'grey';
const stroke = 'none';
const strokeWidth = 2;
const dataValues = [
  { date: 2010, count: 20 },
  { date: 2011, count: 40 },
  { date: 2012, count: 60 },
  { date: 2013, count: 10 },
  { date: 2014, count: 100 },
  { date: 2015, count: 22 },
  { date: 2016, count: 81 },
  { date: 2017, count: 48 },
];

storiesForComponent('Components|StreamLayer', module, ReadMe)
  .add('With data', () => (
    <StreamLayer
      projectId={projectId}
      projectColor={projectColor}
      stroke={stroke}
      strokeWidth={strokeWidth}
      data={dataValues}
    />
  ));
