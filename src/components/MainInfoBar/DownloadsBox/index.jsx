import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import handleInteraction from '../../../utilities/handleInteraction';

import './styles.scss';

const DownloadsBox = props => (
  <div className="DownloadsBox">
    <svg viewBox="0 0 20 20">
      <rect className="fillNone" width="11.6" height="11.6" />
      <polygon className="fillNone" points="0 0 0 11.6 3.4 11.6 3.4 6.7 8.3 6.7 8.3 11.6 11.6 11.6 11.6 0 0 0" />
      <path className="fillVDG" d="M7.8,1l2.8,2.9v6.8H1V1.1H7.8M8.2,0H0V11.6H11.6V3.4L8.2,0Z" />
      <line className="strokeVDG" strokeWidth="0.75p" x1="7.7" y1="0.4" x2="7.7" y2="4" />
      <line className="strokeVDG" strokeWidth="0.75px" x1="11.2" y1="4" x2="7.3" y2="4" />
      <path className="fillVDG" d="M2.9,13.3s-.4-.3,0-.3H4.5V9.2c0-.1.1-.2.3-.2H7c.1,0,.2.1.3.2v3.7H8.8c.5,0,.2.3.2.3L6.1,16Z" />
    </svg>
    <FormattedMessage id="components.mainInfoBar.headings.downloadData" tagName="h1" />
    <p className="first">
      <FormattedMessage
        id="components.mainInfoBar.content.downloadData"
        values={{
          here: (
            <FormattedMessage id="components.mainInfoBar.content.here">
              {text => (
                <button type="button" {...handleInteraction(props.openDataModal)}>
                  {text}
                </button>
              )}
            </FormattedMessage>
          ),
        }}
      />
    </p>
    <svg viewBox="0 0 20 20">
      <rect className="fillVDG" width="11.6" height="11.6" />
      <polygon className="fillVDG" points="0 0 0 11.6 3.4 11.6 3.4 6.7 8.3 6.7 8.3 11.6 11.6 11.6 11.6 0 0 0" />
      <polygon className="fillLG" points="11.1 11.6 8.2 4.8 6.8 5.8 4.8 1.8 0.5 11.6 11.1 11.6" />
      <line className="fillNone strokeVDG" strokeMiterlimit="10" x1="0.5" y1="11.1" x2="11.2" y2="11.1" />
      <circle className="fillLG" cx="9.6" cy="2.4" r="1" />
      <path className="fillVDG" d="M2.9,13.3s-.4-.3,0-.3H4.5V9.1c0-.1.1-.2.3-.2H7c.1,0,.2.1.3.2v3.7H8.8c.5,0,.2.3.2.3L5.9,16Z" />
    </svg>
    <FormattedMessage id="components.mainInfoBar.headings.downloadImage" tagName="h1" />
    <p className="first">
      <FormattedMessage
        id="components.mainInfoBar.content.downloadImage"
        values={{
          here: (
            <FormattedMessage id="components.mainInfoBar.content.here">
              {text => (
                <button type="button" {...handleInteraction(props.openScreenshotModal)}>
                  {text}
                </button>
              )}
            </FormattedMessage>
          ),
        }}
      />
    </p>
  </div>
);

DownloadsBox.propTypes = {
  openDataModal: PropTypes.func.isRequired,
  openScreenshotModal: PropTypes.func.isRequired,
};

export default DownloadsBox;
