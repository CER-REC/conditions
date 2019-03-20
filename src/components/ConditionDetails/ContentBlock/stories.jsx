import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import ContentBlock from '.';
import ReadMe from './README.md';

storiesForComponent('Components|ConditionDetails/ContentBlock', module, ReadMe)
  .add('full block', () => (
    <div>
      <ContentBlock
        id="common.features.theme"
        content="This is a full block"
      />
      <ContentBlock
        id="common.features.theme"
        content="This is a full block"
      />
    </div>
  ))
  .add('half block', () => (
    <div>
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
    </div>
  ));
