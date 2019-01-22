import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import SelectedGroupBar from '.';
import ReadMe from './README.md';

storiesForComponent('Components|SelectedGroupBar', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('default', () => (
    <SelectedGroupBar
      group="components.companyWheel.wheelRay.title"
      groupItem="groupItem"
    >
      condition
    </SelectedGroupBar>
  ))
  .add('with prop: color', () => (
    <SelectedGroupBar
      group="components.companyWheel.wheelRay.title"
      groupItem="groupItem"
      backgroundColor="tomato"
    >
      condition
    </SelectedGroupBar>
  ))
  .add('with prop: groupSize', () => (
    <SelectedGroupBar
      group="components.companyWheel.wheelRay.title"
      groupItem="groupItem"
      groupSize="36px"
    >
      condition
    </SelectedGroupBar>
  ))
  .add('with prop: groupItemSize', () => (
    <SelectedGroupBar
      group="components.companyWheel.wheelRay.title"
      groupItem="groupItem"
      groupItemSize="36px"
    >
      condition
    </SelectedGroupBar>
  ))
  .add('with prop: groupSize & groupItemSize', () => (
    <SelectedGroupBar
      group="components.companyWheel.wheelRay.title"
      groupItem="groupItem"
      groupSize="34px"
      groupItemSize="10px"
    >
      condition
    </SelectedGroupBar>
  ));
