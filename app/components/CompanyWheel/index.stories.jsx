import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import CompanyWheel from './';
import ReadMe from './README.md';

storiesForComponent('Components|CompanyWheel', module, ReadMe)
  .add('default', () => (
    <CompanyWheel ringType="normal" />
  ))
  .add('location props', () => (
    <CompanyWheel ringType="location" />
  ));
