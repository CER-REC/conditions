import React from 'react';
import enLocaleData from 'react-intl/locale-data/en';
import frLocaleData from 'react-intl/locale-data/fr';
import { IntlProvider, addLocaleData, FormattedMessage } from 'react-intl';
import i18nMessages from '../../i18n';
import { lang } from '../../constants';
import AdvancedFormattedMessage from '../../components/AdvancedFormattedMessage';
import TranslatedParagraphs from '../../components/TranslatedParagraphs';
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
    };
  }

  render() {
    let content = (
      <React.Fragment>
        <React.Suspense fallback={null}><LazyApp /></React.Suspense>
        <LoadingGuide />
      </React.Fragment>
    );

    if (!this.state.supportedResolution) {
      content = (
        <div className="unsupportedContainer">
          <FormattedMessage id="views.unsupported.resolution.title" tagName="h1" />
          <AdvancedFormattedMessage
            id="views.unsupported.resolution.body"
            tag={TranslatedParagraphs}
          />
        </div>
      );
    }

    return (
      <IntlProvider locale={lang} messages={i18nMessages[lang]}>
        <div className="App">
          {content}
        </div>
      </IntlProvider>
    );
  }
}
