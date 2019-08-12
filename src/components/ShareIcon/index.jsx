import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { fetch as fetchPolyfill } from 'whatwg-fetch';
import './styles.scss';
import handleInteraction from '../../utilities/handleInteraction';
import CircleContainer from '../CircleContainer';
import Icon from '../Icon';
import RouteComputations from '../../RouteComputations';
import { lang } from '../../constants';

const noop = () => {};

class ShareIcon extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    target: PropTypes.oneOf(['facebook', 'email', 'twitter', 'linkedin']).isRequired,
  };

  static defaultProps = {
    className: '',
    prefix: 'fab',
  };

  getBitlyURL = () => {
    const bitlyEndpoint = RouteComputations.bitlyEndpoint();
    const shortenUrl = RouteComputations.bitlyParameter(lang);
    const uri = `${bitlyEndpoint}?shortenUrl=${shortenUrl}`;

    return fetchPolyfill(uri)
      .then((response) => {
        if (response.body.status_code !== 200) {
          return document.location.href;
        }
        return response.body.data.url;
      }).catch(() => document.location.href);
  };

  handleOnClick = () => {
    if (this.props.target === 'email') {
      this.getBitlyURL().then((url) => {
        const emailBody = url;
        const emailUrl = `mailto:?subject=; &body= ${emailBody}`;
        window.location.href = emailUrl;
      }).catch(noop);
    }
    if (this.props.target === 'facebook') {
      this.getBitlyURL().then((bitlyUrl) => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${bitlyUrl}`;
        window.open(facebookUrl, 'targetWindow', 'width=650,height=650');
      }).catch(noop);
    }
    if (this.props.target === 'linkedin') {
      this.getBitlyURL().then((bitlyUrl) => {
        const locationUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${bitlyUrl}&summary=${bitlyUrl}`;
        window.open(locationUrl, 'targetWindow', 'width=650,height=650');
      }).catch(noop);
    }
    if (this.props.target === 'twitter') {
      this.getBitlyURL().then((bitlyUrl) => {
        const locationUrl = `https://twitter.com/intent/tweet?url=${bitlyUrl}`;
        window.open(locationUrl, 'targetWindow', 'width=650,height=650');
      }).catch(noop);
    }
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

export default ShareIcon;
