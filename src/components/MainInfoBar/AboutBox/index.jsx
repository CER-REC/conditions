import React from 'react';
import { FormattedMessage } from 'react-intl';

const AboutBox = () => (
  <div className="AboutBox">
    <FormattedMessage id="components.mainInfoBar.headings.about" tagName="h1" />
    <FormattedMessage id="components.mainInfoBar.content.about">
      {/* eslint-disable-next-line react/no-array-index-key */}
      {text => text.split('\n').map((para, idx) => <p key={idx}>{para}</p>)}
    </FormattedMessage>
  </div>
);

export default AboutBox;
