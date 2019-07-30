import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../../.storybook/utils';
import TotalConditions from '.';

const closeModal = () => alert('Close is handled by the view and isn\'t available in this story.\n\nPlease use the Knobs panel on the right.');

storiesForComponent('Components|TotalConditionsPopup/TotalCondtions', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <TotalConditions
      isOpen={boolean('Visible', true)}
      closeModal={closeModal}
    />
  ));
