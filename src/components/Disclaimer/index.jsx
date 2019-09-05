import React from 'react';
import { FormattedMessage } from 'react-intl';

import './styles.scss';

const Disclaimer = () => (
  <div className="Disclaimer">
    <FormattedMessage id="components.disclaimer.heading" tagName="strong" />
    &nbsp;
    <FormattedMessage id="components.disclaimer.text" />
  </div>
);

export default React.memo(Disclaimer);
