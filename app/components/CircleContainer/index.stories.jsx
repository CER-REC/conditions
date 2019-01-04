import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import ReadMe from './README.md';
import CircleContainer from '.';

storiesForComponent('Components|CircleContainer', module, ReadMe)
  .addDecorator(withStatus({
    name: 'underReview',
    note: 'This is a supporting component that is used for circular elements, and is under review by VizworX.',
  }))
  .add('default', () => (
    <CircleContainer
      size="24px"
    >
    &nbsp;
    </CircleContainer>))
  .add('with icon', () => (
    <CircleContainer
      size="24px"
    >
      &lt;
    </CircleContainer>
  ))
  .add('with text', () => (
    <CircleContainer
      size="24px"
    >
      150
    </CircleContainer>
  ))
  .add('with prop: size ', () => (
    <CircleContainer
      size="60px"
    >
    &nbsp;
    </CircleContainer>
  ))
  .add('with prop: onClick ', () => (
    <CircleContainer
      size="24px"
      onClick={() => alert('clicked')}
    >
    &nbsp;
    </CircleContainer>
  ))
  .add('with prop: elevated', () => (
    <CircleContainer
      size="24px"
      elevated
    >
    &nbsp;
    </CircleContainer>
  ))
  .add('with prop: className', () => (
    <React.Fragment>
      <CircleContainer
        size="24px"
        className="blue"
      >
        &nbsp;
      </CircleContainer>
      <style dangerouslySetInnerHTML={// eslint-disable-line react/no-danger
        { __html: '.CircleContainer.blue { background: blue } ' }}
      />
    </React.Fragment>
  ))
  .add('with prop: disabled', () => (
    <CircleContainer
      size="24px"
      disabled
    >
    &nbsp;
    </CircleContainer>));
