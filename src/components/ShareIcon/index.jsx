import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { fetch as fetchPolyfill } from 'whatwg-fetch';
import './styles.scss';
import handleInteraction from '../../utilities/handleInteraction';
import { reportAnalytics } from '../../utilities/analyticsReporting';
import CircleContainer from '../CircleContainer';
import Icon from '../Icon';
import RouteComputations from '../../RouteComputations';
import { lang, shareUrls } from '../../constants';

const noop = () => {};

class ShareIcon extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    target: PropTypes.oneOf(['facebook', 'email', 'twitter', 'linkedin']).isRequired,
    intl: intlShape.isRequired,
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

  openShareWindow = baseUrl => this.getBitlyURL().then((bitlyUrl) => {
    window.open(`${baseUrl}${bitlyUrl}`, 'targetWindow', 'width=650,height=650');
  }).catch(noop);

  handleOnClick = () => {
    reportAnalytics('share', 'menu', this.props.target);

    if (shareUrls[this.props.target]) {
      this.openShareWindow(shareUrls[this.props.target]);
    } else {
      this.getBitlyURL().then((url) => {
        const subject = this.props.intl.formatMessage({ id: 'components.shareIcon.emailSubject' });
        const bodyText = this.props.intl.formatMessage({ id: 'components.shareIcon.emailBody' });
        const emailUrl = `mailto:?subject=${
          encodeURIComponent(subject)
        }&body=${
          encodeURIComponent(url)
        }%0A%0A${
          encodeURIComponent(bodyText)
        }`;
        window.location.href = emailUrl;
      }).catch(err => console.error(err));
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

export default injectIntl(ShareIcon);
