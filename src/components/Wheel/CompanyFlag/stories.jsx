import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import CompanyFlag from '.';

const flagLayouts = [
  ['1111111', '111', '11', '1'],
  ['1111111', '101', '11', '1'],
  ['1111111111111'],
];

storiesForComponent('Components|Wheel/CompanyFlag')
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
