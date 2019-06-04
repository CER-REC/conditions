import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Request from 'client-request/promise';
import './styles.scss';
import handleInteraction from '../../utilities/handleInteraction';
import CircleContainer from '../CircleContainer';
import Icon from '../Icon';
import RouteComputations from '../../RouteComputations';

class ShareIcon extends React.PureComponent {
  getBitlyURL = () => {
    const bitlyEndpoint = RouteComputations.bitlyEndpoint();
    // TODO: will remove this hardcoded value 'en' once langaguge prop is introduce
    const shortenUrl = RouteComputations.bitlyParameter('en');

    const options = {
      uri: `${bitlyEndpoint}?shortenUrl=${shortenUrl}`,
      json: true,
    };
    return Request(options)
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
      }).catch(
        () => {
          // do nothing
        },
      );
    }
    if (this.props.target === 'facebook') {
      this.getBitlyURL().then((bitlyUrl) => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${bitlyUrl}`;
        window.open(facebookUrl, 'targetWindow', 'width=650,height=650');
      }).catch(
        () => {
          // do nothing
        },
      );
    }
    if (this.props.target === 'linkedin') {
      this.getBitlyURL().then((bitlyUrl) => {
        const locationUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${bitlyUrl}&summary=${bitlyUrl}`;
        window.open(locationUrl, 'targetWindow', 'width=650,height=650');
      }).catch(
        () => {
          // do nothing
        },
      );
    }
    if (this.props.target === 'twitter') {
      this.getBitlyURL().then((bitlyUrl) => {
        const locationUrl = `https://twitter.com/intent/tweet?url=${bitlyUrl}`;
        window.open(locationUrl, 'targetWindow', 'width=650,height=650');
      }).catch(
        () => {
          // do nothing
        },
      );
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

