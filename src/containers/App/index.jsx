import React from 'react';
import enLocaleData from 'react-intl/locale-data/en';
import frLocaleData from 'react-intl/locale-data/fr';
import { IntlProvider, addLocaleData } from 'react-intl';
import i18nMessages from '../../i18n';
import { lang } from '../../constants';
import ErrorBoundary from '../../components/ErrorBoundary';
import UnsupportedWarning from '../../components/UnsupportedWarning';
import LoadingGuide from '../../components/LoadingGuide';
import './minimumStyles.scss';

addLocaleData(enLocaleData);
addLocaleData(frLocaleData);

const LazyApp = React.lazy(() => import('./lazy'));

export default class AppWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      supportedResolution: window.innerWidth >= 746,
      // This will detect any version of IE up to and including IE11
      supportedBrowser: !(!!window.MSInputMethodContext && !!document.documentMode),
    };
  }

  render() {
    const content = (!this.state.supportedResolution && <UnsupportedWarning type="resolution" />)
      || (!this.state.supportedBrowser && <UnsupportedWarning type="browser" />)
      || (
        <React.Fragment>
          <React.Suspense fallback={null}><LazyApp /></React.Suspense>
          <LoadingGuide />
        </React.Fragment>
      );

    return (
      <IntlProvider locale={lang} messages={i18nMessages[lang]}>
        <div className="App">
          <ErrorBoundary>
            {content}
          </ErrorBoundary>
        </div>
      </IntlProvider>
    );
  }
}
