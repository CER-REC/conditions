import React from 'react';
import { FormattedMessage } from 'react-intl';
import AdvancedFormattedMessage from '../../AdvancedFormattedMessage';
import { lang, nltkLink } from '../../../constants';
import './styles.scss';

const imageContext = require.context('../../../../public/images/keywordMethodology/', true, /\.png$/);
const images = imageContext.keys().reduce((acc, cur) => {
  const [imageLang, id] = cur.match(/^\.\/(\w+)\/KeywordMethodology(\d+)_/).slice(1);

  if (imageLang === lang) {
    acc.push((
      <AdvancedFormattedMessage
        id={`components.mainInfoBar.content.keywords.${id}`}
        tag={({ children }) => <img src={imageContext(cur)} alt={children} title={children} />}
        key={id}
      />
    ));
  }

  return acc;
}, []);

images[3] = <a href={nltkLink} target="_blank" rel="noopener noreferrer" key="4">{images[3]}</a>;

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
            href="placeholder"
            target="_blank"
            rel="noopener noreferrer"
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

export default MethodologyBox;
