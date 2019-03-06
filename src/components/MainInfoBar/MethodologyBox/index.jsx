import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const MethodologyBox = props => (
  <div className="MethodologyBox">
    <FormattedMessage id="components.mainInfoBar.headings.methodology" tagName="h1" />
    <p className="first">
      <FormattedMessage
        id="components.mainInfoBar.content.methodology"
        values={{
          here: (
            <FormattedMessage id="components.mainInfoBar.content.here">
              {text => <a href={props.pdfUrl} target="_blank" rel="noopener noreferrer">{text}</a>}
            </FormattedMessage>
          ),
        }}
      />
    </p>
    <FormattedMessage id="components.mainInfoBar.headings.keywords" tagName="h1" />
    <FormattedMessage id="components.mainInfoBar.content.keywords">
      {text => <p className="first">{text}</p>}
    </FormattedMessage>
  </div>
);

MethodologyBox.propTypes = {
  pdfUrl: PropTypes.string.isRequired,
};

export default MethodologyBox;
