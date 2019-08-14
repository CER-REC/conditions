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
        { name: 'Company A' },
        { name: 'Company B' },
        { name: 'Company C' },
        { name: 'Company D' },
        { name: 'Company E' },
        { name: 'Company F' },
        { name: 'Company G' },
        { name: 'Company H' },
        { name: 'Company I' },
        { name: 'Company J' },
        { name: 'Company K' },
        { name: 'Company L' },
        { name: 'Company M' },
        { name: 'Company N' },
        { name: 'Company O' },
      ]}
    />
  ));
