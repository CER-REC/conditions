import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import ReadMe from './README.md';

import CompanyPopup from '.';

const closeModal = () => alert('Close is handled by the view and isn\'t available in this story.\n\nPlease use the Knobs panel on the right.');

storiesForComponent('Components|CompanyPopup', module, ReadMe)
  .addDecorator(withKnobs)
  .add('default', () => (
    <CompanyPopup
      isOpen={boolean('Visible', true)}
      closeModal={closeModal}
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
