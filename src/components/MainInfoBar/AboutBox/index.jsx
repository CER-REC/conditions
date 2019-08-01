import React from 'react';
import { FormattedMessage } from 'react-intl';
import AdvancedFormattedMessage from '../../AdvancedFormattedMessage';
import TranslatedParagraphs from '../../TranslatedParagraphs';

const formatEmail = email => (
  <a href={`mailto:${email}`} rel="noopener noreferrer" target="_blank">{email}</a>
);

// eslint-disable-next-line react/prop-types
const ConcatenatedEmailText = ({ children }) => (
  <p key="emailUs">{children}</p>
);

const contributorIndices = [1, 2, 3];

// eslint-disable-next-line react/prop-types
const FormattedContributorSection = ({ children }) => {
  // eslint-disable-next-line react/prop-types
  const lines = children.split('\n');
  const heading = lines.shift();

  return (
    <React.Fragment>
      <h2>{heading}</h2>
      { lines.map(line => <p key={line}>{line}</p>) }
    </React.Fragment>
  );
};

const AboutBox = () => (
  <div className="AboutBox">
    <FormattedMessage id="components.mainInfoBar.headings.about" tagName="h1" />
    <AdvancedFormattedMessage
      id="components.mainInfoBar.content.about"
      tag={TranslatedParagraphs}
    />
    <FormattedMessage
      id="components.mainInfoBar.content.emailUs"
      tag={ConcatenatedEmailText}
      values={{
        email: (
          <FormattedMessage id="common.linkText.NEBLink">
            {formatEmail}
          </FormattedMessage>
        ),
      }}
    />
    <FormattedMessage id="components.mainInfoBar.headings.contributors" tagName="h1" />
    {contributorIndices.map(i => (
      <AdvancedFormattedMessage
        id={`components.mainInfoBar.content.contributors.${i}`}
        key={i}
        tag={FormattedContributorSection}
      />
    ))}
  </div>
);

export default AboutBox;
