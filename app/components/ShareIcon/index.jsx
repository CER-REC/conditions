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
    if (this.props.target === 'email') {
      window.location.href = 'mailto:?subject=&body=';
      return;
    }
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

  render() {
    const icon = this.props.target === 'email' ? 'envelope' : this.props.target;
    return (
      <div
        className="ShareIcon"
        {...handleInteraction(this.handleOnClick)}
      >
        <CircleContainer size="20px">
          <Icon size="1x" icon={icon} prefix={this.props.prefix} />
        </CircleContainer>
      </div>
    );
  }
}

ShareIcon.propTypes = {
  className: PropTypes.string,
  prefix: PropTypes.string,
  target: PropTypes.oneOf(['facebook', 'email', 'twitter', 'linkedin']).isRequired,
};

ShareIcon.defaultProps = {
  className: '',
  prefix: 'fab',
};

export default ShareIcon;

