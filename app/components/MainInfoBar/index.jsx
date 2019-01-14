import React from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
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
);

class MainInfoBar extends React.PureComponent {
  handleDoubleArrows = () => {
    if (this.props.textBox !== '') {
      this.props.textBox = '';
    }
  }

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
        <div className="ShareIcons">
          {this.shareIcons()}
        </div>
        {
          this.props.textBox === ''
            ? null
            : <ShareIcon icon="envelope" onChange={this.props.handleDoubleArrows} />
        }
      </div>
    );
  }
}

MainInfoBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  handleDoubleArrows: PropTypes.func.isRequired,
  textBox: PropTypes.string,
  handleOnClick: PropTypes.func.isRequired,
};

MainInfoBar.defaultProps = {
  textBox: '',
};

export default MainInfoBar;
