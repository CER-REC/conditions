import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import Guide from '.';

import ReadMe from './README.md';

storiesForComponent('Components|Guide', module, ReadMe)
  .add('default', () => <Guide textState={4} />);
