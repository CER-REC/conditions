import React from 'react';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import AboutTextBox from '../../components/AboutTextBox';
import MainInfoBar from '../../components/MainInfoBar';
import Footer from '.';

const boxSizing = [
  <div><span style={{ fontSize: '50px', marginLeft: '45%' }}>1</span></div>,
];

const components = [
  <MainInfoBar />,
];

storiesForView('Containers|Footer', module, ReadMe)
  .add('default', () => (
    <Footer components={boxSizing} />
  ))
  .add('with components', () => (
    <Footer components={components} />
  ));
