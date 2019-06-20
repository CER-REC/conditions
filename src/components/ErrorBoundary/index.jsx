import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import './styles.scss';

class ErrorBoundary extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  getRestoreLink = () => document.location.href;

  getResetLink = () => document.location.origin + document.location.pathname;

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <section className="ErrorBoundary">
          <section className="errorMessage">
            <FormattedMessage id="components.errorBoundary.errorMessage" tagName="h1" />
          </section>
          <section className="restoreLink">
            <FormattedMessage id="components.errorBoundary.restoreMessage" />
            <a href={`${this.getRestoreLink()}`}>
              <FormattedMessage id="components.errorBoundary.restoreLinkText" />
            </a>
          </section>
          <section className="resetLink">
            <FormattedMessage id="components.errorBoundary.resetMessage" />
            <a href={`${this.getResetLink()}`}>
              <FormattedMessage id="components.errorBoundary.resetLinkText" />
            </a>
          </section>
          <section className="details">
            <details>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          </section>
        </section>
      );
    }
    return this.props.children;
  }
}
ErrorBoundary.propTypes = {
  // Default children props from react
  children: PropTypes.func.isRequired,
};

export default ErrorBoundary;
