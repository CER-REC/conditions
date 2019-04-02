import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../../.storybook/utils';
import Company from '.';

const noop = () => {};

storiesForComponent('Components|CompanyPopup/Company', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Company
      isOpen={boolean('Visible', true)}
      closeModal={noop}
      projectName="Trans Mountain Expansion"
      companies={[
        'Company A',
        'Company B',
        'Company C',
        'Company D',
        'Company E',
        'Company F',
        'Company G',
        'Company H',
        'Company I',
        'Company J',
        'Company K',
        'Company L',
        'Company M',
        'Company N',
        'Company O',
      ]}
    />
  ));
