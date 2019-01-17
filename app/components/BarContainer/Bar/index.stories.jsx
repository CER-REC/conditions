import React from 'react';
import withStatus from '../../../../.storybook/addon-status';
import { storiesForComponent } from '../../../../.storybook/utils';
import Bar from '.';
import ReadMe from './README.md';

storiesForComponent('Components|BarContainer/Bar', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('default', () => (
    (
      <svg>
        <Bar
          width={100}
          height={20}
          x={0}
          y={0}
          fill="tomato"
        />
      </svg>
    )
  ));
