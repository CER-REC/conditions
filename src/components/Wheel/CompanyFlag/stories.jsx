import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import CompanyFlag from '.';
// import ReadMe from './README.md';
const ReadMe = '';

/*
 * 1 = Dot
 * 3 = Filtered
 * 5 = Relevant
 * 7 = Filtered + Relevant
 */

const defaultProps = {
  x: 100,
  y: 0,
  dotWidth: 16,
  dotSpacing: 24,
  height: 163,
  width: 0,
};

const flagLayouts = [
  ['1551111', '313', '77', '1'],
  ['1551111', '303', '77', '1'],
  ['1551111313771'],
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
