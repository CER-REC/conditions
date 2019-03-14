import React from 'react';
import { FormattedMessage } from 'react-intl';

const MethodologyBox = () => (
  <div className="MethodologyBox">
    <FormattedMessage id="components.mainInfoBar.headings.methodology" tagName="h1" />
    <FormattedMessage
      id="components.mainInfoBar.content.methodology"
      tagName="p"
      values={{
        here: (
          <FormattedMessage id="components.mainInfoBar.content.here">
            {text => <a href="placeholder" target="_blank" rel="noopener noreferrer">{text}</a>}
          </FormattedMessage>
        ),
      }}
    />
    <FormattedMessage id="components.mainInfoBar.headings.keywords" tagName="h1" />
    <FormattedMessage id="components.mainInfoBar.content.keywords" tagName="p" />
  </div>
);

export default MethodologyBox;
