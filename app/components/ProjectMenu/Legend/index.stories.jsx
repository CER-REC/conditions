import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import Legend from './';
import ReadMe from './README.md';

const items = [
  { name: 'Standard Condition', count: 15, color: 'brown' },
  { name: 'Integrity Management', count: 34, color: 'pink' },
  { name: 'Environmental Protection', count: 34, color: 'green' },
  { name: 'Administrative', count: 9, color: 'limegreen' },
  { name: 'Sunset Clause', count: 2, color: 'blue' },
  { name: 'Enforcement', count: 66, color: 'lightblue' },
  { name: 'Emergency Management', count: 0, color: 'teal' },
  { name: 'Socio-Economic', count: 127, color: 'lavender' },
  { name: 'Safety Management', count: 0, color: 'midnightblue' },
  { name: 'Damage Prevention', count: 0, color: 'purple' },
  { name: 'Financial', count: 14, color: 'moccasin' },
  { name: 'Security', count: 79, color: 'tomato' },
  { name: 'Management System', count: 4, color: 'forestgreen' },
  { name: 'No Theme Indicated', count: 5, color: 'black' },
];

storiesForComponent('Components|ProjectMenu/Legend', module, ReadMe)
  .add('No props', () => (
    <Legend items={[]} />
  ))
  .add('Required props', () => (
    <Legend items={items} />
  ));

