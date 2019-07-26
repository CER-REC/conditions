import React from 'react';
import { FormattedMessage } from 'react-intl';

const formatEmail = (id) => (
  <FormattedMessage id={id}>
    {email => <a href={`mailto:${email}`} rel="noopener noreferrer" target="_blank">{email}</a>}
  </FormattedMessage>
);

const AboutBox = () => (
  <div className="AboutBox">
    <FormattedMessage id="components.mainInfoBar.headings.about" tagName="h1" />
    <FormattedMessage
      id="components.mainInfoBar.content.about"
      values={{ nebLink: formatEmail('common.linkText.NEBLink') }}
    />
    <FormattedMessage
      id="components.mainInfoBar.content.about"
      values={{ nebLink: formatEmail('common.linkText.NEBLink') }}
    >
      {/* eslint-disable-next-line react/no-array-index-key */}
      {text => text.split('\n').map((para, idx) => <p key={idx}>{para}</p>)}
    </FormattedMessage>
    {/* TODO: Fix the styling for contributors */}
    <FormattedMessage id="components.mainInfoBar.headings.contributor" tagName="h1" />
    <FormattedMessage id="components.mainInfoBar.content.contributor">
      {/* eslint-disable-next-line react/no-array-index-key */}
      {text => text.split('\n').map((para, idx) => <p key={idx}>{para}</p>)}
    </FormattedMessage>
  </div>
);

export default AboutBox;
