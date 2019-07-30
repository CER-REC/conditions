import React from 'react';
import enLocaleData from 'react-intl/locale-data/en';
import frLocaleData from 'react-intl/locale-data/fr';
import { IntlProvider, addLocaleData } from 'react-intl';
import i18nMessages from '../../i18n';
import { lang } from '../../constants';
import LoadingGuide from '../../components/LoadingGuide';
import './minimumStyles.scss';

addLocaleData(enLocaleData);
addLocaleData(frLocaleData);

/*
const LazyApp = React.lazy(() => import('./lazy'));
*/
const LazyApp = React.lazy(() => new Promise((res) => {
  setTimeout(() => res(import('./lazy')), 0);
}));

export default () => (
  <IntlProvider locale={lang} messages={i18nMessages[lang]}>
    <React.Fragment>
      <div className="App Loading">
        <div className="fixedContainer">
          <div className="guideWrapper">
            <LoadingGuide />
          </div>
        </div>
      </div>
      <React.Suspense fallback={null}>
        <LazyApp />
      </React.Suspense>
    </React.Fragment>
  </IntlProvider>
);
