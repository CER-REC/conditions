import React from 'react';
import { FormattedMessage } from 'react-intl';

const MethodologyBox = () => (
  <div className="MethodologyBox">
    <FormattedMessage id="components.mainInfoBar.headings.methodology" tagName="h1" />
    <p className="first">
      <FormattedMessage
        id="components.mainInfoBar.content.methodology"
        values={{
          here: (
            <FormattedMessage id="components.mainInfoBar.content.here">
              {text => <a href="placeholder" target="_blank" rel="noopener noreferrer">{text}</a>}
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

export default MethodologyBox;
