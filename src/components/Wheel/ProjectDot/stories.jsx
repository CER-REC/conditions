import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesForComponent, withStyles } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import ProjectDot from '.';
import ReadMe from './README.md';

storiesForComponent('Components|Wheel/ProjectDot', module, ReadMe)
  .addDecorator(withKnobs)
  .addDecorator(withStyles)
  .addDecorator(withStatus('underReview'))
  .add('default', () => (
    <svg height="100" width="100">
      <ProjectDot
        filtered={boolean('Filtered', false)}
        relevant={boolean('Relevant', false)}
      />
    </svg>
  ), { styles: '.Wheel { padding-top: unset }' });

