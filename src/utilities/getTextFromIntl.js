import React from 'react';
import { injectIntl } from 'react-intl';

export default fn => React.createElement(injectIntl(({ intl }) => fn(intl.formatMessage)));
