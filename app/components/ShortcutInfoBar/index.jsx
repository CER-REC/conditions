import React from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faInfoCircle,
  faAngleDoubleDown,
  faFileDownload,
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
  faFileDownload,
);

class ShortcutInfoBar extends React.PureComponent {
  infoButton() {
    return (
      <div
        className="InfoButton"
        onClick={this.props.handleInfoButton}
        onKeyPress={this.props.handleInfoButton}
        role="button"
        tabIndex="0"
      >
        <ShareIcon
          icon="info-circle"
          prefix="fas"
        />
      </div>
    );
  }

  aboutThisVisualization() {
    return (
      <div className="About">
        <button
          type="button"
          onClick={this.props.onChange}
        >
        About this Visualization
        </button>
        <ShareIcon
          icon="angle-double-down"
          onChange={this.props.onChange}
          prefix="fas"
        />
      </div>
    );
  }

  share() {
    const shareIconsList = ['twitter', 'facebook', 'linkedin'];
    const emailIcon = (
      <ShareIcon
        key="email"
        icon="envelope"
        onChange={this.props.onChange}
        prefix="fas"
      />
    );
    const shareIcons = shareIconsList.map(k => (
      <ShareIcon
        key={k}
        icon={k}
        onChange={this.props.onChange}
      />
    ));
    return (
      <div className="Icons">
        Share:
        {emailIcon}
        {shareIcons}
      </div>
    );
  }

  download() {
    const downloadIconsList = ['file-download', 'file-download'];
    const downloadIcons = downloadIconsList.map(k => (
      <ShareIcon
        key={k}
        icon={k}
        onChange={this.props.onChange}
        prefix="fas"
      />
    ));
    return (
      <div className="Icons">
        Download:
        {downloadIcons}
      </div>
    );
  }

  infoBar() {
    if (!this.props.handleInfoBar) { return null; }
    return (
      <div className="InfoBar">
        {this.aboutThisVisualization()}
        <br />
        {this.share()}
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
  onChange: PropTypes.func.isRequired,
  handleInfoButton: PropTypes.func.isRequired,
  handleInfoBar: PropTypes.func.isRequired,
};

export default ShortcutInfoBar;
