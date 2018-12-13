import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import ProjectDot from './';
import ReadMe from './README.md';

const wrapperSetup = (propOverrides) => {
  const props = Object.assign({
    nameOfCssClass: null,
  }, propOverrides);

  return <ProjectDot {...props} />;
};

storiesForComponent('Components|CompanyWheel/ProjectDot', module, ReadMe)
  .add('default', () => (
    <svg height="100" width="100" >
      {wrapperSetup()};
    </svg>
  ))
  .add('filtered', () => (
    <svg height="100" width="100" >
      {wrapperSetup({ nameOfCssClass: 'isFiltered' })};
    </svg>
  ))
  .add('relevant', () => (
    <svg height="100" width="100" >
      {wrapperSetup({ nameOfCssClass: 'isRelevant' })};
    </svg>
  ));
