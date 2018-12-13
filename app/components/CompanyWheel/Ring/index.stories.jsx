import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import Ring from './';
import ReadMe from './README.md';
import './styles.scss';

storiesForComponent('Components|CompanyWheel/Ring', module, ReadMe)
  .add('default view', () => (
    <svg className="wheelContainer" viewBox="120 200 500 500">
      <Ring className="wheelContainer" ringType="company" />
    </svg>
  )).add('location view', () => (
    <svg className="wheelContainer" viewBox="120 200 500 500">
      <Ring className="wheelContainer" ringType="location" />
    </svg>
  ));
