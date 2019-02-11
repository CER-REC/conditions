import React from 'react';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import BrowseByBtn from '../../components/BrowseByBtn';
import ShortcutInfoBar from '../../components/ShortcutInfoBar';
import ViewOne from '.';

const handleInfoBar = false;
const jumpToAbout = () => {};
const openDataModal = () => {};
const openScreenshotModal = () => {};

const boxSizing = [
  <div><span style={{ fontSize: '50px', marginLeft: '45%' }}>1</span></div>,
  <div><span style={{ fontSize: '50px', marginLeft: '45%' }}>2&3</span></div>,
  <div><span style={{ fontSize: '50px', marginLeft: '45%' }}>4</span></div>,
  <div><span style={{ fontSize: '50px', marginLeft: '45%' }}>5</span></div>,
];

const components = [
  <div><span style={{ fontSize: '50px', fontWeight: '700' }}>CONDITIONS ON NEB-REGULATED ENERGY PROJECTS</span></div>,
  <div><span style={{ fontSize: '50px', marginLeft: '45%' }}>1</span></div>,
  <div>
    <BrowseByBtn
      mode="company"
      {...{}}
    />
    <BrowseByBtn
      mode="location"
      {...{}}
    />
  </div>,
  <ShortcutInfoBar
    onChange={() => {}}
    handleInfoBar={handleInfoBar}
    jumpToAbout={jumpToAbout}
    openDataModal={openDataModal}
    openScreenshotModal={openScreenshotModal}
  />,
];

storiesForView('Containers|ViewOne', module, ReadMe)
  .add('default', () => (
    <ViewOne components={boxSizing} />
  ))
  .add('with components', () => (
    <ViewOne components={components} />
  ));
