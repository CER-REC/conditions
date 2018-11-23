import React from 'react';
import { storiesForComponent } from '../../../../../.storybook/utils';
import FeatureFlag from './';
import ReadMe from './README.md';

storiesForComponent('Components|ProjectMenu/ProjectChart/FeatureFlag', module, ReadMe)
  .add('Default props', () => (
    <FeatureFlag color="" count={0} />
  ))
  .add('Required props', () => (
    <FeatureFlag color="pink" count={18} />
  ));

