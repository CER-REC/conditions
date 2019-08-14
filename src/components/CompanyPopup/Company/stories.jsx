import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../../.storybook/utils';
import Company from '.';

const closeModal = () => alert('Close is handled by the view and isn\'t available in this story.\n\nPlease use the Knobs panel on the right.');

storiesForComponent('Components|CompanyPopup/Company', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Company
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
