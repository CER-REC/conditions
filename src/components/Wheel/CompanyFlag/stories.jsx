import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import CompanyFlag from '.';
import ReadMe from './README.md';

/*
 * 1 = Dot
 * 3 = Filtered
 * 5 = Relevant
 * { filtered: true; relevant: true },  = Filtered + Relevant
 */

const defaultProps = {
  x: 150,
  y: 100,
  dotWidth: 16,
  dotSpacing: 24,
  height: 100,
  width: 0,
};

const flagLayouts = [
  [
    [
      { filtered: false, relevant: false },
      { filtered: false, relevant: true },
      { filtered: false, relevant: true },
      { filtered: false, relevant: false },
      { filtered: false, relevant: false },
      { filtered: false, relevant: false },
      { filtered: false, relevant: false },
    ],
    [
      { filtered: true, relevant: false },
      { filtered: false, relevant: false },
      { filtered: true, relevant: false },
    ],
    [
      { filtered: true, relevant: true },
      { filtered: true, relevant: true },
    ],
    [
      { filtered: false, relevant: false },
    ],
  ],
  [
    [
      { filtered: false, relevant: false },
      { filtered: false, relevant: true },
      { filtered: false, relevant: true },
      { filtered: false, relevant: false },
      { filtered: false, relevant: false },
      { filtered: false, relevant: false },
      { filtered: false, relevant: false },
    ],
    [
      { filtered: true, relevant: false },
      0,
      { filtered: true, relevant: false },
    ],
    [
      { filtered: true, relevant: true },
      { filtered: true, relevant: true },
    ],
    [
      { filtered: false, relevant: false },
    ],
  ],
  [
    [
      { filtered: false, relevant: false },
      { filtered: false, relevant: true },
      { filtered: false, relevant: true },
      { filtered: false, relevant: false },
      { filtered: false, relevant: false },
      { filtered: false, relevant: false },
      { filtered: false, relevant: false },
      { filtered: true, relevant: false },
      { filtered: false, relevant: false },
      { filtered: true, relevant: false },
      { filtered: true, relevant: true },
      { filtered: true, relevant: true },
      { filtered: false, relevant: false },
    ],
  ],
];

storiesForComponent('Components|Wheel/CompanyFlag', module, ReadMe)
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
