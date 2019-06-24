import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import ContentBlock from '.';
import ReadMe from './README.md';

storiesForComponent('Components|ConditionDetails/ContentBlock', module, ReadMe)
  .add('default', () => (
    <div>
      <ContentBlock
        id="common.features.theme"
        content="This is a content block"
      />
      <ContentBlock
        id="common.features.theme"
        content="This is a content block"
      />
    </div>
  ));

