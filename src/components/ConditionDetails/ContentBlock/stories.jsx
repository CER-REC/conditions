import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import ContentBlock from '.';
import ReadMe from './README.md';

storiesForComponent('Components|ConditionDetails/ContentBlock', module, ReadMe)
  .add('full block', () => (
    <div style={{ width: 300, height: 50 }}>
      <ContentBlock
        id="common.features.theme"
        content="This is a full block"
      />
      <ContentBlock
        id="common.features.theme"
        content="This is a full block"
      />
      {/* Fixes a Storybook rendering issue */}
      <style dangerouslySetInnerHTML={// eslint-disable-line react/no-danger
        { __html: '.ConditionDetails { display: block; width: 100% } ' }}
      />
    </div>
  )).add('half block', () => (
    <div style={{ width: 300, height: 50 }}>
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
      {/* Fixes a Storybook rendering issue */}
      <style dangerouslySetInnerHTML={// eslint-disable-line react/no-danger
        { __html: '.ConditionDetails { display: block; width: 100% } ' }}
      />
    </div>
  ));
