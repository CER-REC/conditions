import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';

import './styles.scss';

import ShareIcon from '../ShareIcon';
import AboutBox from './AboutBox';
import MethodologyBox from './MethodologyBox';
import DownloadsBox from './DownloadsBox';
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
    return ({
      about: (
        <AboutBox />
      ),
      methodology: (
        <MethodologyBox
          pdfUrl={this.props.pdfUrl}
        />
      ),
      downloads: (
        <DownloadsBox
          openDataModal={this.props.openDataModal}
          openScreenshotModal={this.props.openScreenshotModal}
        />
      ),
    })[this.props.activeDialog];
  }

  openDialog(k) {
    this.props.setActiveDialog(k);
    if (!this.props.expanded) this.props.toggleExpanded(true);
  }

  closeDialog() {
    this.props.toggleExpanded(false);
  }

  textButtons() {
    const buttons = ['about', 'methodology', 'downloads'];
    const textButton = buttons.map(k => (
      <button
        key={k}
        id={k}
        className={`textButton ${this.props.activeDialog === k ? 'selected' : ''}`}
        type="button"
        onClick={() => this.openDialog(k)}
      >
        <FormattedMessage id={`components.mainInfoBar.headings.${k}`} />
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
  activeDialog: PropTypes.oneOf(['about', 'methodology', 'downloads']),
  isView1: PropTypes.bool,
  expanded: PropTypes.bool,
  pdfUrl: PropTypes.string.isRequired,
  setActiveDialog: PropTypes.func.isRequired,
  toggleExpanded: PropTypes.func.isRequired,
  openDataModal: PropTypes.func.isRequired,
  openScreenshotModal: PropTypes.func.isRequired,
};

MainInfoBar.defaultProps = {
  activeDialog: 'about',
  isView1: false,
  expanded: false,
};

export default MainInfoBar;
