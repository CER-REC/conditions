import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import CompanyFlag from '.';

const data = [7, 3, 2, 1]

storiesForComponent('Wheel|CompanyFlag')
  .add('default', () => {
    const flags = flagLayoutCalculation.map(flagLayout => <CompanyFlag data={flagLayout} />);
    return <CompanyFlag data={layoutData} />;
  });
