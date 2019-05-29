import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
 // TODO: Implement Bitly service to get shortened url
 getBitlyURL = () => document.location.href;

  handleOnClick = () => {
    if (this.props.target === 'email') {
      const url = 'mailto:?subject=&body=';
      window.location.assign(url);
      return;
    }
    const url = this.getBitlyURL(); // TODO: get shortened bitly URL
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
        className={classNames(
          'ShareIcon',
          this.props.className,
        )}
        {...handleInteraction(this.handleOnClick)}
      >
        <CircleContainer size={20}>
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

