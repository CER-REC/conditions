import React from 'react';
import { FormattedMessage } from 'react-intl';
import AdvancedFormattedMessage from '../../AdvancedFormattedMessage';
import TranslatedParagraphs from '../../TranslatedParagraphs';

const formatEmail = email => (
  <a href={`mailto:${email}`} rel="noopener noreferrer" target="_blank">{email}</a>
);

const AboutBox = () => (
  <div className="AboutBox">
    <FormattedMessage id="components.mainInfoBar.headings.about" tagName="h1" />
    <AdvancedFormattedMessage
      id="components.mainInfoBar.content.about"
      tag={TranslatedParagraphs}
    />
    <FormattedMessage
      id="components.mainInfoBar.content.emailUs"
      tagName="p"
      values={{
        emailPlaceholder: (
          <FormattedMessage id="common.linkText.NEBLink">
            {formatEmail}
          </FormattedMessage>
        ),
      }}
    />
    <AdvancedFormattedMessage
      id="components.mainInfoBar.content.lookForward"
      tag={TranslatedParagraphs}
    />
    <FormattedMessage id="components.mainInfoBar.headings.contributor" tagName="h1" />
    <AdvancedFormattedMessage
      id="components.mainInfoBar.content.contributor"
      tag={TranslatedParagraphs}
    />
  </div>
);

export default AboutBox;
