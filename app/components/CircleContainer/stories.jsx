import React from 'react';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import ReadMe from './README.md';
import CircleContainer from '.';

const options = {
  range: true,
  min: 0,
  max: 300,
  step: 50,
};

storiesForComponent('Components|CircleContainer', module, ReadMe)
  .addDecorator(withKnobs)
  .addDecorator(withStatus({
    name: 'underReview',
    note: 'This is a supporting component that is used for circular elements, and is under review by VizworX.',
  }))
  .add('default', () => (
    <CircleContainer
      elevated={boolean('Elevated', false)}
      size={number('size(px)', 60, options)}
      disabled={boolean('Disabled', false)}
    >
      &nbsp;
    </CircleContainer>
  ))
  .add('with icon', () => (
    <CircleContainer
      elevated={boolean('Elevated', false)}
      size={number('size(px)', 60, options)}
      disabled={boolean('Disabled', false)}
    >
      &lt;
    </CircleContainer>
  ))
  .add('with text', () => (
    <CircleContainer
      elevated={boolean('Elevated', false)}
      size={number('size(px)', 60, options)}
      disabled={boolean('Disabled', false)}
    >
      150
    </CircleContainer>
  ))
  .add('with prop: onClick ', () => (
    <CircleContainer
      elevated={boolean('Elevated', false)}
      size={number('size(px)', 60, options)}
      disabled={boolean('Disabled', false)}
      onClick={() => alert('clicked')}
    >
    &nbsp;
    </CircleContainer>
  ))
  .add('with prop: className', () => (
    <React.Fragment>
      <CircleContainer
        elevated={boolean('Elevated', false)}
        size={number('size(px)', 60, options)}
        disabled={boolean('Disabled', false)}
        className="blue"
      >
        &nbsp;
      </CircleContainer>
      <style dangerouslySetInnerHTML={// eslint-disable-line react/no-danger
        { __html: '.CircleContainer.blue { background: blue } ' }}
      />
    </React.Fragment>
  ));
