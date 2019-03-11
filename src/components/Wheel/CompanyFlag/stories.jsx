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

const flagLayouts = [
  ['1551111', '313', '77', '1'],
  ['1551111', '303', '77', '1'],
  ['1551111313771'],
];

storiesForComponent('Components|Wheel/CompanyFlag', module, ReadMe)
  .add('full', () => (
    <svg height={400} width={200}>
      <CompanyFlag flagLayout={flagLayouts[0]} dotWidth={16} dotSpacing={24} />
    </svg>
  ))
  .add('hollow', () => (
    <svg height={400} width={200}>
      <CompanyFlag flagLayout={flagLayouts[1]} dotWidth={16} dotSpacing={24} />
    </svg>
  ))
  .add('unfolded', () => (
    <svg height={400} width={200}>
      <CompanyFlag flagLayout={flagLayouts[2]} dotWidth={16} dotSpacing={24} />
    </svg>
  ));
