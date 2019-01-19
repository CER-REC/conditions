import React from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';
import ShareIcon from '../ShareIcon';
import AboutTextBox from '../AboutTextBox';
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
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
    };
  }

  setActiveDialog = (activeDialog) => {
    if (activeDialog === 'About') {
      return <AboutTextBox />;
    }
    if (activeDialog === 'Methodology') {
      return <MethodologyTextBox />;
    }
    if (activeDialog === 'Downloads') {
      return <DownloadsTextBox />;
    }
    this.setState({ dialogOpen: true });
    return null;
  }

  textButtons() {
    const buttons = ['About', 'Methodology', 'Downloads'];
    const textButton = buttons.map(k => (
      <button
        key={k}
        id={k}
        className={`TextButton ${this.props.activeDialog === k ? 'selected' : ''}`}
        type="button"
        onClick={() => this.props.handleOnClick(k)}
      >
        {k}
      </button>
    ));
    return textButton;
  }

  closeDialog() {
    this.setState({ dialogOpen: false });
  }

  shareIcons() {
    const iconsList = ['twitter', 'facebook', 'linkedin'];
    const emailIcon = (
      <ShareIcon
        key="email"
        icon="envelope"
        onChange={this.props.onChange}
        prefix="fas"
      />
    );
    const icons = iconsList.map(k => (
      <ShareIcon
        key={k}
        icon={k}
        prefix="fab"
        onChange={this.props.onChange}
      />
    ));
    return (
      <div className="ShareIcons">
        {emailIcon}
        {icons}
      </div>
    );
  }

  render() {
    return (
      <div className="MainInfoBar">
        <hr />
        {this.textButtons()}
        <br />
        <div className="TextBox">
          {this.setActiveDialog(this.props.activeDialog)}
        </div>
        <br />
        {this.shareIcons()}
        <br />
        {
          this.state.dialogOpen
            ? null
            : (
              <CircleContainer
                className="AngleDoubleDown"
                size="20px"
                onClick={this.closeDialog}
              >
                <Icon color="grey" size="1x" icon="angle-double-up" prefix="fas" />
              </CircleContainer>
            )
        }
      </div>
    );
  }
}

MainInfoBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  activeDialog: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func.isRequired,
};

export default MainInfoBar;
