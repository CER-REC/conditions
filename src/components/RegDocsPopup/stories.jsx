import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import ReadMe from './README.md';

import RegDocsPopup from '.';

const closeModal = () => alert('Close is handled by the view and isn\'t available in this story.\n\nPlease use the Knobs panel on the right.');

storiesForComponent('Components|RegDocsPopup', module, ReadMe)
  .addDecorator(withKnobs)
  .add('default', () => (
    <RegDocsPopup
      isOpen={boolean('Visible', true)}
      closeModal={closeModal}
      document="MO-025-2011"
      counts={{
        conditionCount: 10,
        instrumentCount: 3,
      }}
    />
  ));
