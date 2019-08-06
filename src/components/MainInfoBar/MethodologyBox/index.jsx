import React from 'react';
import { FormattedMessage } from 'react-intl';
import AdvancedFormattedMessage from '../../AdvancedFormattedMessage';
import { lang } from '../../../constants';

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
    <FormattedMessage id="components.mainInfoBar.content.keywords" tagName="p" />
    {lang === 'en'
      ? (
        <div>
          <img src="KeywordMethodology1_EN_480w.png" alt="English1" /><br />
          <img src="../../../images/KeywordMethodology2_EN_480w.png" alt="English2" /><br />
          <img src="../../../images/KeywordMethodology3_EN_480w.png" alt="English3" /><br />
          <img src="../../../images/KeywordMethodology4_EN_480w.png" alt="English4" /><br />
          <img src="../../../images/KeywordMethodology5_EN_480w.png" alt="English5" /><br />
          <img src="../../../images/KeywordMethodology6_EN_480w.png" alt="English6" /><br />
        </div>
      )
      : (
        <div>
          <img src="../../../images/KeywordMethodology1_FR_480w.png" alt="French1" /><br />
          <img src="../../../images/KeywordMethodology2_FR_480w.png" alt="French2" /><br />
          <img src="../../../images/KeywordMethodology3_FR_480w.png" alt="French3" /><br />
          <img src="../../../images/KeywordMethodology4_FR_480w.png" alt="French4" /><br />
          <img src="../../../images/KeywordMethodology5_FR_480w.png" alt="French5" /><br />
          <img src="../../../images/KeywordMethodology6_FR_480w.png" alt="French6" /><br />
        </div>
      )
    }

  </div>
);

export default MethodologyBox;
