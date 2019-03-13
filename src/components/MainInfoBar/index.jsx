import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';

import handleInteraction from '../../utilities/handleInteraction';

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
  static getDerivedStateFromProps(props, state) {
    // Expanded is determined by whether we have an pane prop
    // The renderedDialog is either the active dialog, or the previously active one.
    return {
      expanded: !!props.pane,
      renderedDialog: props.pane || state.renderedDialog,
    };
  }

  constructor(props) {
    super(props);
    this.state = { expanded: false, renderedDialog: '' };
  }

  getDialogContent = () => {
    switch (this.state.renderedDialog) {
      case 'about': default:
        return <AboutBox />;
      case 'methodology':
        return <MethodologyBox />;
      case 'downloads':
        return (
          <DownloadsBox
            openDataModal={this.props.openDataModal}
            openScreenshotModal={this.props.openScreenshotModal}
          />
        );
    }
  }

  closeDialog = () => this.props.setPane('');

  textButtons = () => {
    const buttons = ['about', 'methodology', 'downloads'];
    const textButton = buttons.map(k => (
      <button
        key={k}
        id={k}
        className={`textButton ${this.props.pane === k ? 'selected' : ''}`}
        type="button"
        {...handleInteraction(this.props.setPane, k)}
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
        <div className="topLine" />
        <div>
          {this.textButtons()}
        </div>
        <div className={classNames('content', { expanded: this.state.expanded })}>
          {this.getDialogContent()}
        </div>
        <div className="shareIcons">
          {emailIcon}
          {icons}
        </div>
        {
          (!this.state.expanded)
            ? null
            : (
              <CircleContainer
                className="angleDoubleDown"
                size={20}
                onClick={this.closeDialog}
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
  pane: PropTypes.oneOf(['', 'about', 'methodology', 'downloads']).isRequired,
  setPane: PropTypes.func.isRequired,
  openDataModal: PropTypes.func.isRequired,
  openScreenshotModal: PropTypes.func.isRequired,
};

export default MainInfoBar;
