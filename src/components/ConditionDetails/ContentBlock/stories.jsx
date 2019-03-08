import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import ContentBlock from '.';
import ReadMe from './README.md';

storiesForComponent('Components|ConditionDetails/ContentBlock', module, ReadMe)
  .add('full block', () => (
    <React.Fragment>
      <ContentBlock
        id="common.features.theme"
        content="This is a full block"
      />
      <ContentBlock
        id="common.features.theme"
        content="This is a full block"
      />
    </React.Fragment>
  ))
  .add('half block', () => (
    <React.Fragment>
      <ContentBlock
        id="common.features.theme"
        content="This is a half block"
        half
      />
      <ContentBlock
        id="common.features.theme"
        content="This is a half block"
        half
      />
    </React.Fragment>
  ));
