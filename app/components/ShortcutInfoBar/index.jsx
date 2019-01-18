import React from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faInfoCircle,
  faAngleDoubleDown,
} from '@fortawesome/free-solid-svg-icons';
import './styles.scss';
import ShareIcon from '../ShareIcon';

library.add(
  faTwitter,
  faEnvelope,
  faFacebook,
  faLinkedin,
  faInfoCircle,
  faAngleDoubleDown,
);

class ShortcutInfoBar extends React.PureComponent {
  infoButton() {
    return (
      <div
        className="InfoButton"
        onClick={this.props.handleInfoBar}
        onKeyPress={this.props.handleInfoBar}
        role="button"
        tabIndex="0"
      >
        <svg viewBox="0 0 50 100">
          <g transform="scale(3)">
            <path fill="none" stroke="#fff" strokeMiterlimit={10} d="M8.3.5a7.8,7.8,0,1,0,7.8,7.8A7.81,7.81,0,0,0,8.3.5" />
            <path fill="#fff" d="M6,7.2a4.3,4.3,0,0,1,1.8-.5c.9,0,1.7.5,1.7,1.3a9,9,0,0,1-.3,1.9s-.2.9-.3,1.2-.2.8.2,1,1.2-.4,1.2-.4l-.4,1.1a4,4,0,0,1-1.5.4,2.35,2.35,0,0,1-1.6-.5,2,2,0,0,1-.4-1.9c.1-.5.8-2.5.6-3S5.8,8,5.8,8Z" />
            <path fill="#fff" d="M7.3,4.3A1.42,1.42,0,0,1,8.7,3,1.33,1.33,0,0,1,9.9,4.4,1.42,1.42,0,0,1,8.5,5.7,1.17,1.17,0,0,1,7.3,4.3" />
          </g>
        </svg>
      </div>
    );
  }

  aboutThisVisualization() {
    return (
      <div className="About">
        <button
          type="button"
          onClick={this.props.jumpToAbout}
        >
        About this Visualization
        </button>
        <ShareIcon
          icon="angle-double-down"
          onChange={this.props.jumpToAbout}
          prefix="fas"
        />
      </div>
    );
  }

  download() {
    return (
      <div className="Icons">
        Download:
        <svg>
          <g
            key="file-download"
            icon="file-download"
            onChange={this.props.openDataModal}
          >
            <path fill="#666" d="M2.9,13.3s-.4-.3,0-.3H4.5V9.2c0-.1.1-.2.3-.2H7c.1,0,.2.1.3.2v3.7H8.8c.5,0,.2.3.2.3L6.1,16Z" />
            <polygon fill="none" points="0 0 0 11.6 3.4 11.6 3.4 6.7 8.3 6.7 8.3 11.6 11.6 11.6 11.6 0 0 0" />
            <line strokeMiterlimit="10" x1="0.5" y1="11.1" x2="11.2" y2="11.1" />
            <rect fill="none" width="11.6" height="11.6" />
            <path fill="#666" d="M7.8,1l2.8,2.9v6.8H1V1.1H7.8M8.2,0H0V11.6H11.6V3.4L8.2,0Z" />
            <line stroke="#666" strokeWidth="0.75p" x1="7.7" y1="0.4" x2="7.7" y2="4" />
            <line stroke="#666" strokeWidth="0.75px" x1="11.2" y1="4" x2="7.3" y2="4" />
          </g>
          <g
            transform="translate(20, 0)"
            key="image-download"
            icon="image-download"
            onChange={this.props.openScreenshotModal}
          >
            <rect fill="#666" width="11.6" height="11.6" />
            <polygon fill="#666" points="0 0 0 11.6 3.4 11.6 3.4 6.7 8.3 6.7 8.3 11.6 11.6 11.6 11.6 0 0 0" />
            <polygon fill="#e6e6e6" points="11.1 11.6 8.2 4.8 6.8 5.8 4.8 1.8 0.5 11.6 11.1 11.6" />
            <path fill="#666" d="M2.9,13.3s-.4-.3,0-.3H4.5V9.1c0-.1.1-.2.3-.2H7c.1,0,.2.1.3.2v3.7H8.8c.5,0,.2.3.2.3L5.9,16Z" />
            <line fill="none" stroke="#666" strokeMiterlimit={10} x1="0.5" y1="11.1" x2="11.2" y2="11.1" />
            <circle fill="#e6e6e6" cx="9.6" cy="2.4" r="1" />
          </g>
        </svg>
      </div>
    );
  }

  infoBar() {
    if (!this.props.handleInfoBar) { return null; }
    const shareIconsList = ['twitter', 'facebook', 'linkedin'];
    const emailIcon = (
      <ShareIcon
        key="email"
        icon="envelope"
        prefix="fas"
      />
    );
    const shareIcons = shareIconsList.map(k => (
      <ShareIcon
        key={k}
        icon={k}
      />
    ));
    return (
      <div className="InfoBar">
        {this.aboutThisVisualization()}
        <br />
        <div className="Icons">
          Share:
          {emailIcon}
          {shareIcons}
        </div>
        <br />
        {this.download()}
      </div>
    );
  }

  render() {
    return (
      <div className="ShortcutInfoBar">
        {this.infoButton()}
        {this.infoBar()}
      </div>
    );
  }
}

ShortcutInfoBar.propTypes = {
  handleInfoBar: PropTypes.bool.isRequired,
  jumpToAbout: PropTypes.func.isRequired,
  openDataModal: PropTypes.func.isRequired,
  openScreenshotModal: PropTypes.func.isRequired,
};

export default ShortcutInfoBar;
