import React from 'react';
import { storiesForView } from '../../../.storybook/utils';
import ProjectMenu from '../../components/FeaturesMenu';
import ReadMe from './README.md';
import ViewThree from '.';

const boxSizing = [
  <div><span style={{ fontSize: '50px', marginLeft: '45%' }}>1</span></div>,
  <div><span style={{ fontSize: '50px', marginLeft: '45%' }}>2</span></div>,
  <div><span style={{ fontSize: '50px', marginLeft: '45%' }}>3</span></div>,
  <div><span style={{ fontSize: '50px', marginLeft: '45%' }}>4</span></div>,
  <div><span style={{ fontSize: '50px', marginLeft: '45%' }}>5</span></div>,
  <div><span style={{ fontSize: '50px', marginLeft: '45%' }}>6</span></div>,
  <div><span style={{ fontSize: '50px', marginLeft: '45%' }}>7</span></div>,
];

storiesForView('Containers|ViewThree', module, ReadMe)
  .add('default', () => (
    <ViewThree components={boxSizing} />
  ))
  .add('with components', () => (
    <ViewThree components={0} />
  ));
