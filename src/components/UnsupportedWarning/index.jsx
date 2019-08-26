import React from 'react';
import propTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import AdvancedFormattedMessage from '../AdvancedFormattedMessage';
import TranslatedParagraphs from '../TranslatedParagraphs';

import './styles.scss';

const UnsupportedWarning = props => (
  <div className="UnsupportedWarning">
    <FormattedMessage id={`views.unsupported.${props.type}.title`} tagName="h1" />
    <AdvancedFormattedMessage
      id={`views.unsupported.${props.type}.body`}
      tag={TranslatedParagraphs}
    />
  </div>
);

UnsupportedWarning.propTypes = {
  type: propTypes.oneOf(['resolution', 'browser']).isRequired,
};

export default UnsupportedWarning;
