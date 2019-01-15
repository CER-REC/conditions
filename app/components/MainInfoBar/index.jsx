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

library.add(
  faTwitter,
  faEnvelope,
  faFacebook,
  faLinkedin,
  faAngleDoubleUp,
);

class MainInfoBar extends React.PureComponent {
  handleOnClick = () => {
    if (this.props.textBox === 'About') { return <AboutTextBox />; }
    if (this.props.textBox === 'Methodology') { return <MethodologyTextBox />; }
    if (this.props.textBox === 'Downloads') { return <DownloadsTextBox />; }
    return null;
  };

  textButtons() {
    const buttons = ['About', 'Methodology', 'Downloads'];
    const textButton = buttons.map(k => (
      <button
        key={k}
        id={k}
        className={`TextButton ${this.props.textBox === k ? 'selected' : ''}`}
        type="button"
        onClick={() => this.props.handleOnClick(k)}
      >
        {k}
      </button>
    ));
    return textButton;
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
          {this.handleOnClick(this.props.textBox)}
        </div>
        <br />
        {this.shareIcons()}
        {
          this.props.textBox === ''
            ? null
            : (
              <ShareIcon
                icon="angle-double-up"
                prefix="fas"
                onChange={this.props.textBox}
              />
            )
        }
      </div>
    );
  }
}

MainInfoBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  textBox: PropTypes.string,
  handleOnClick: PropTypes.func.isRequired,
};

MainInfoBar.defaultProps = {
  textBox: '',
};

export default MainInfoBar;
