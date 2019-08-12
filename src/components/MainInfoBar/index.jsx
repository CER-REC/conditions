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
import DownloadBox from './DownloadBox';
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
  static propTypes = {
    pane: PropTypes.oneOf(['', 'about', 'methodology', 'download']).isRequired,
    setPane: PropTypes.func.isRequired,
    openDataModal: PropTypes.func.isRequired,
  };

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
      case 'download':
        return (
          <DownloadBox
            openDataModal={this.props.openDataModal}
          />
        );
    }
  }

  closeDialog = () => this.props.setPane('');

  textButtons = () => {
    const buttons = ['about', 'methodology', 'download'];
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

export default MainInfoBar;
