import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import StackGroup from '.';
import ReadMe from './README.md';

const positionControl = 'translate(30, 30)';
const numOfConditions = 213;
const yHeight = '20';
const controlTopBaseline = '10';
const onDragStart = () => {};
const onDragMove = () => {};
const onDragStop = () => {};
const handleOnChange = () => {};
const handleArrowKey = () => {};
const children = () => {};
const showControl = true;

storiesForComponent('Components|StreamGraph/StackGroup', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('with default values', () => (
    <svg>
      <StackGroup
        handleOnChange={handleOnChange}
        handleArrowKey={handleArrowKey}
        showControl={showControl}
        positionControl={positionControl}
        numOfConditions={numOfConditions}
        onDragStart={onDragStart}
        onDragMove={onDragMove}
        onDragStop={onDragStop}
        yHeight={yHeight}
        controlTopBaseline={controlTopBaseline}
      >
      children={children}
      </StackGroup>
    </svg>
  ));
