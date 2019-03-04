import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import MainInfoBar from '.';
import ReadMe from './README.md';

// eslint-disable-next-line
const Container = ({children}) => (
  <div style={{ width: 700, height: 600 }}>
    {children}
  </div>
);

storiesForComponent('Components|MainInfoBar', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('default', () => <Container><MainInfoBar /></Container>)
  .add('About', () => <Container><MainInfoBar activeDialog="About" /></Container>)
  .add('Methodology', () => <Container><MainInfoBar activeDialog="Methodology" /></Container>)
  .add('Downloads', () => <Container><MainInfoBar activeDialog="Downloads" /></Container>)
  .add('View 1', () => <Container><MainInfoBar isView1 /></Container>);
