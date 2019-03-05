import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const MethodologyBox = props => (
  <div className="MethodologyBox">
    <FormattedMessage id="components.mainInfoBar.headings.methodology" tag="h1" />
    <FormattedMessage id="components.mainInfoBar.content.methodology">
      {(text) => {
        const fragments = text.match(/(.+)\{(.+)\}(.+)/);
        if (!fragments) return null;

        return (
          <p className="first">
            {fragments[1]}
            <a href={props.pdfUrl} target="_blank" rel="noopener noreferrer"> {fragments[2]} </a>
            {fragments[3]}
          </p>
        );
      }}
    </FormattedMessage>
    <FormattedMessage id="components.mainInfoBar.headings.keywords" tag="h1" />
    <FormattedMessage id="components.mainInfoBar.content.keywords">
      {text => <p className="first">{text}</p>}
    </FormattedMessage>
  </div>
);

MethodologyBox.propTypes = {
  pdfUrl: PropTypes.string.isRequired,
};

export default MethodologyBox;
