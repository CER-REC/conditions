import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import handleInteraction from '../../utilities/handleInteraction';
import CircleContainer from '../CircleContainer';
import Icon from '../Icon';

class ShareIcon extends React.PureComponent {
  /*
  shortenUrl = () => {
    TODO: shorten URL with bitly
  };
  */

  handleOnClick = () => {
    // TODO: make share icon clickable
    let url; // TODO: get shortened bitly URL
    let locationUrl;
    if (this.props.target === 'facebook') {
      locationUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    }
    if (this.props.target === 'linkedin') {
      locationUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&summary=${url}`;
    }
    if (this.props.target === 'twitter') {
      locationUrl = `https://twitter.com/intent/tweet?url=${url}`;
    }
    window.open(
      `${locationUrl}`,
      'targetWindow',
      'width=650,height=650',
    );
  }

  emailOnClick = () => {
    // TODO: get shortned bitly URL
    window.location.href = 'mailto:?subject=&body=';
  }

  render() {
    return (
      <div
        className="ShareIcon"
        {...handleInteraction(this.handleOnClick, this.emailOnClick)}
      >
        <CircleContainer size="20px">
          <Icon size="1x" icon={this.props.target} prefix={this.props.prefix} />
        </CircleContainer>
      </div>
    );
  }
}

ShareIcon.propTypes = {
  className: PropTypes.string,
  prefix: PropTypes.string,
  icon: PropTypes.string.isRequired,
  target: PropTypes.oneOf(['facebook', 'twitter', 'linkedin']).isRequired,
};

ShareIcon.defaultProps = {
  className: '',
  prefix: 'fab',
};

export default ShareIcon;

