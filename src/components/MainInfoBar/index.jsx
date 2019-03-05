import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';
import ShareIcon from '../ShareIcon';
import AboutTextBox from './AboutTextBox';
import MethodologyTextBox from './MethodologyTextBox';
import DownloadsTextBox from './DownloadsTextBox';
import CircleContainer from '../CircleContainer';
import Icon from '../Icon';

library.add(
  faTwitter,
  faEnvelope,
  faFacebook,
  faLinkedin,
  faAngleDoubleUp,
);

class MainInfoBar extends React.PureComponent {
  getDialogContent() {
    switch (this.props.activeDialog) {
      case 'Methodology':
        return (
          <MethodologyTextBox
            pdfUrl={this.props.pdfUrl}
          />
        );
      case 'Downloads':
        return (
          <DownloadsTextBox
            openDataModal={this.props.openDataModal}
            openScreenshotModal={this.props.openScreenshotModal}
          />
        );
      case 'About':
      default:
        return <AboutTextBox />;
    }
  }

  openDialog(k) {
    this.props.setActiveDialog(k);
    if (!this.props.expanded) this.props.toggleExpanded(true);
  }

  closeDialog() {
    this.props.toggleExpanded(false);
  }

  textButtons() {
    const buttons = ['About', 'Methodology', 'Downloads'];
    const textButton = buttons.map(k => (
      <button
        key={k}
        id={k}
        className={`textButton ${this.props.activeDialog === k ? 'selected' : ''}`}
        type="button"
        onClick={() => this.openDialog(k)}
      >
        {k}
      </button>
    ));
    return textButton;
  }

  render() {
    const iconsList = ['twitter', 'facebook', 'linkedin'];
    const emailIcon = (
      <ShareIcon
        target="email"
        prefix="fas"
      />
    );
    const icons = iconsList.map(k => (
      <ShareIcon
        key={k}
        target={k}
        prefix="fab"
      />
    ));
    return (
      <div className="MainInfoBar">
        <div className={classNames('topLine', { view1: this.props.isView1 })} />
        <div>
          {this.textButtons()}
        </div>
        <div className={classNames('content', { expanded: this.props.expanded })}>
          {this.getDialogContent()}
        </div>
        <div className="shareIcons">
          {emailIcon}
          {icons}
        </div>
        {
          (!this.props.expanded)
            ? null
            : (
              <CircleContainer
                className="angleDoubleDown"
                size={20}
                onClick={() => this.closeDialog()}
              >
                <Icon size="1x" icon="angle-double-up" prefix="fas" />
              </CircleContainer>
            )
        }
      </div>
    );
  }
}

MainInfoBar.propTypes = {
  activeDialog: PropTypes.string,
  isView1: PropTypes.bool,
  expanded: PropTypes.bool,
  pdfUrl: PropTypes.string.isRequired,
  setActiveDialog: PropTypes.func.isRequired,
  toggleExpanded: PropTypes.func.isRequired,
  openDataModal: PropTypes.func.isRequired,
  openScreenshotModal: PropTypes.func.isRequired,
};

MainInfoBar.defaultProps = {
  activeDialog: 'About',
  isView1: false,
  expanded: false,
};

export default MainInfoBar;
