import React from 'react';
import { FormattedMessage } from 'react-intl';

const formatEmail = id => (
  <FormattedMessage id={id}>
    {email => <a href={`mailto:${email}`} rel="noopener noreferrer" target="_blank">{email}</a>}
  </FormattedMessage>
);

const AboutBox = () => (
  <div className="AboutBox">
    <FormattedMessage id="components.mainInfoBar.headings.about" tagName="h1" />
    <FormattedMessage id="components.mainInfoBar.content.about">
      {/* eslint-disable-next-line react/no-array-index-key */}
      {text => text.split('\n').map((para, idx) => <p key={idx}>{para}</p>)}
    </FormattedMessage>
    <FormattedMessage id="components.mainInfoBar.content.emailUs">
      {text => <p key="emailUs">{text}: {formatEmail('common.linkText.NEBLink')}</p>}
    </FormattedMessage>
    <FormattedMessage id="components.mainInfoBar.content.lookForward" />
    <FormattedMessage id="components.mainInfoBar.headings.contributor" tagName="h1" />
    <FormattedMessage id="components.mainInfoBar.content.contributor">
      {/* eslint-disable-next-line react/no-array-index-key */}
      {text => text.split('\n').map((para, idx) => <p key={idx}>{para}</p>)}
    </FormattedMessage>
  </div>
);

export default AboutBox;
