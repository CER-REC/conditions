import React from 'react';
import { storiesForComponent, withStyles } from '../../../../.storybook/utils';
import { relevantProjects, filteredProjects } from '../randomDataSample';
import CompanyFlag from '.';
import ReadMe from './README.md';

const defaultProps = {
  x: 150,
  y: 100,
  dotWidth: 16,
  dotSpacing: 24,
  svgHeight: 100,
  relevantProjects,
  filteredProjects,
};

const flagLayouts = [
  [
    [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
    ],
    [
      8,
      9,
      10,
    ],
    [
      11,
      12,
    ],
    [
      13,
    ],
  ],
  [
    [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
    ],
    [
      8,
      0,
      9,
    ],
    [
      10,
      11,
    ],
    [
      12,
    ],
  ],
  [
    [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
    ],
  ],
];

storiesForComponent('Components|Wheel/CompanyFlag', module, ReadMe)
  .addDecorator(withStyles(`
    .Wheel { padding-top: 0; }
  `))
  .add('full', () => (
    <svg height={400} width={200}>
      <CompanyFlag {...defaultProps} flagLayout={flagLayouts[0]} />
    </svg>
  ))
  .add('hollow', () => (
    <svg height={400} width={200}>
      <CompanyFlag {...defaultProps} flagLayout={flagLayouts[1]} />
    </svg>
  ))
  .add('unfolded', () => (
    <svg height={400} width={200}>
      <CompanyFlag {...defaultProps} flagLayout={flagLayouts[2]} />
    </svg>
  ));
