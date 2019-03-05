import React from 'react';
import { FormattedMessage } from 'react-intl';

const AboutBox = () => (
  <div className="AboutBox">
    <FormattedMessage id="components.mainInfoBar.headings.about" tag="h1" />
    <FormattedMessage id="components.mainInfoBar.content.about">
      {(text) => {
        const fragments = text.split('\n');
        // eslint-disable-next-line react/no-array-index-key
        const rest = fragments.slice(2).map((para, idx) => <p key={idx}>{para}</p>);

        return (
          <React.Fragment>
            <p className="first">{fragments[0]}</p>
            {rest}
          </React.Fragment>
        );
      }}
    </FormattedMessage>

  </div>
);

export default AboutBox;
