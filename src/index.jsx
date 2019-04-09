import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import DomReady from 'domready';
import { IntlProvider } from 'react-intl';
import './styles.scss'; // Import this before any components to ensure CSS ordering works
import App from './containers/App';
import i18nMessages from './i18n';

DomReady(() => {
  ReactDOM.render(
    <IntlProvider locale="en" messages={i18nMessages.en}>
      <div className="visualization"><App /></div>
    </IntlProvider>,
    document.getElementById('reactRoot'),
  );
});
