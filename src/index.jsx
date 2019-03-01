import React from 'react';
import ReactDOM from 'react-dom';
import DomReady from 'domready';
import { IntlProvider } from 'react-intl';
import App from './containers/App';
import './styles.scss';
import i18nMessages from './i18n';

DomReady(() => {
  ReactDOM.render(
    <IntlProvider locale="en" messages={i18nMessages.en}>
      <div className="visualization"><App /></div>
    </IntlProvider>,
    document.getElementById('reactRoot'),
  );
});
