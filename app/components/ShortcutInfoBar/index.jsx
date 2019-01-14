import React from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';
import ShareIcon from '../ShareIcon';

library.add(
  faTwitter,
  faEnvelope,
  faFacebook,
  faLinkedin,
);

class ShortCutInfoBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = ({
      expandInfoBar: false,
    });
  }

  handleInfoButton = () => {
    this.setState({ expandInfoBar: true });
  };

  shareIcons() {
    const iconsList = ['envelope', 'envelope', 'envelope', 'envelope'];
    const icons = iconsList.map(k => (
      <ShareIcon
        key={k}
        icon={k}
        onChange={this.props.onChange}
      />
    ));
    return icons;
  }

  infoButton() {
    return (
      <div
        className="InfoButton"
        onChange={this.handleInfoButton}
      >
        <ShareIcon
          icon="envelope"
        />
      </div>
    );
  }

  aboutThisVisualization() {
    return (
      <div className="About">
        <button
          type="button"
          onClick={() => {}}
        >
        About this Visualization
        </button>
        <ShareIcon
          icon="envelope"
          onChange={this.props.onChange}
        />
      </div>
    );
  }

  share() {
    const shareIconsList = ['envelope', 'envelope', 'envelope', 'envelope'];
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
        {shareIcons}
      </div>
    );
  }

  download() {
    const downloadIconsList = ['envelope', 'envelope'];
    const downloadIcons = downloadIconsList.map(k => (
      <ShareIcon
        key={k}
        icon={k}
        onChange={this.props.onChange}
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
    if (!this.state.expandInfoBar) { return null; }
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
      <div className="ShortCutInfoBar">
        {this.infoButton()}
        {this.infoBar()}
      </div>
    );
  }
}

ShortCutInfoBar.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default ShortCutInfoBar;
