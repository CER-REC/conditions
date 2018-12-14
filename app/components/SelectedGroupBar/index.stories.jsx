import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import SelectedGroupBar from './';
import ReadMe from './README.md';

storiesForComponent('Components|SelectedGroupBar', module, ReadMe)
  .add('default', () => (
    <SelectedGroupBar group="Group" groupItem="groupItem" />
  ))
  .add('with prop: color', () => (
    <SelectedGroupBar group="Group" groupItem="groupItem" color="tomato" />
  ))
  .add('with prop: groupSize', () => (
    <SelectedGroupBar group="Group" groupItem="groupItem" groupSize="36px" />
  ))
  .add('with prop: groupItemSize', () => (
    <SelectedGroupBar group="Group" groupItem="groupItem" groupItemSize="36px" />
  ))
  .add('with prop: groupSize & groupItemSize', () => (
    <SelectedGroupBar group="Group" groupItem="groupItem" groupSize="34px" groupItemSize="10px" />
  ));
