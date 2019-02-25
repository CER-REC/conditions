import React from 'react';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import Footer from '.';

storiesForView('Containers|Footer', module, ReadMe)
  .add('default', () => <Footer />)
  .add('layout only', () => <Footer layoutOnly />);
