import React from 'react';
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
      activeDialog: '',
    };
  }

  setActiveDialog = activeDialog => this.setState({ activeDialog });

  getDialogContent() {
    const { activeDialog } = this.state;
    if (activeDialog === 'About') { return <AboutTextBox />; }
    if (activeDialog === 'Methodology') { return <MethodologyTextBox />; }
    if (activeDialog === 'Downloads') { return <DownloadsTextBox />; }
    return null;
  }

  closeDialog = () => this.setActiveDialog('');

  textButtons() {
    const buttons = ['About', 'Methodology', 'Downloads'];
    const textButton = buttons.map(k => (
      <button
        key={k}
        id={k}
        className={`TextButton ${this.state.activeDialog === k ? 'selected' : ''}`}
        type="button"
        onClick={() => this.setActiveDialog(k)}
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
        <hr />
        {this.textButtons()}
        <br />
        <div className="TextBox">
          {this.getDialogContent()}
        </div>
        <br />
        <div className="ShareIcons">
          {emailIcon}
          {icons}
        </div>
        <br />
        {
          this.state.activeDialog === ''
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

export default MainInfoBar;
