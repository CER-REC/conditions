import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../../.storybook/utils';
import RegDocs from '.';

const closeModal = () => alert('Close is handled by the view and isn\'t available in this story.\n\nPlease use the Knobs panel on the right.');

storiesForComponent('Components|RegDocsPopup/RegDocs', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <RegDocs
      isOpen={boolean('Visible', true)}
      closeModal={closeModal}
      document="MO-025-2011"
    />
  ));
