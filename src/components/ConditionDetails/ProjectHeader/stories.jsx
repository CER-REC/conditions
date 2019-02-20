import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../../.storybook/utils';
import ProjectHeader from '.';
import ReadMe from './README.md';

const toggleExpanded = () => expand => ({ expanded: expand });

storiesForComponent('Components|ConditionDetails/ProjectHeader', module, ReadMe)
  .addDecorator(withInteraction({ actions: ['toggleExpanded'] }))
  .add('expandable', () => (
    <div style={{ width: 400, height: 24 }}>
      <ProjectHeader
        isExpandable
        selectedProject="Keystone XL"
        openProjectDetails={() => alert('Project details')}
        {...getInteractionProps()}
      />
      {/* Fixes a Storybook rendering issue */}
      <style dangerouslySetInnerHTML={// eslint-disable-line react/no-danger
        { __html: '.ConditionDetails { display: block; width: 100% } ' }}
      />
    </div>
  ), { interaction: { actions: { toggleExpanded } } })
  .add('not expandable', () => (
    <div style={{ width: 400, height: 24 }}>
      <ProjectHeader
        selectedProject="Keystone XL"
        openProjectDetails={() => alert('Project details')}
        {...getInteractionProps()}
      />
      {/* Fixes a Storybook rendering issue */}
      <style dangerouslySetInnerHTML={// eslint-disable-line react/no-danger
        { __html: '.ConditionDetails { display: block; width: 100% } ' }}
      />
    </div>
  ));
