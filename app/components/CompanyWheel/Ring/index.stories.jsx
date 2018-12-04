import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import Ring from './';
import ReadMe from './README.md';
import './styles.scss';

storiesForComponent('Components|CompanyWheel/Ring', module, ReadMe)
  .add('defaultView', () => (
    <Ring className="wheelContainer" ringType="normal" />
  ));
