import React from 'react';
import { FormattedMessage } from 'react-intl';
import AdvancedFormattedMessage from '../../AdvancedFormattedMessage';
import { handleUnblockedInteraction } from '../../../utilities/handleInteraction';
import { reportAnalytics } from '../../../utilities/analyticsReporting';
import { lang, nltkLink, pdfLink } from '../../../constants';
import './styles.scss';

const imageContext = require.context('./keywordMethodology/', true, /\.png$/);
// eslint-disable-next-line react/prop-types
const Image = ({ children, src }) => <img src={src.default || src} alt={children} title={children} />;
const images = imageContext.keys().reduce((acc, cur) => {
  const [imageLang, id] = cur.match(/^\.\/(\w+)\/KeywordMethodology(\d+)_/).slice(1);

  if (imageLang === lang) {
    acc.push((
      <AdvancedFormattedMessage
        id={`components.mainInfoBar.content.keywords.${id}`}
        tag={Image}
        key={id}
        src={imageContext(cur)}
      />
    ));
  }

  return acc;
}, []);

images[3] = (
  <a href={nltkLink} target="_blank" rel="noopener noreferrer" key="4">
    {images[3]}
  </a>
);

const reportDownloadLink = e => reportAnalytics(e.type, 'download', 'methodology');

const MethodologyBox = () => (
  <div className="MethodologyBox">
    <FormattedMessage id="components.mainInfoBar.headings.methodology" tagName="h1" />
    <FormattedMessage
      id="components.mainInfoBar.content.methodology"
      tagName="p"
      values={{
        here: (
          <AdvancedFormattedMessage
            id="components.mainInfoBar.content.here"
            tag="a"
            href={pdfLink}
            target="_blank"
            rel="noopener noreferrer"
            {...handleUnblockedInteraction(reportDownloadLink)}
          />
        ),
      }}
    />
    <FormattedMessage id="components.mainInfoBar.headings.keywords" tagName="h1" />
    <div className="KeywordExplanation">
      {images}
    </div>

  </div>
);

export default React.memo(MethodologyBox);
