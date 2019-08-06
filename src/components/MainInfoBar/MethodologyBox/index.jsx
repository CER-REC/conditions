import React from 'react';
import { FormattedMessage } from 'react-intl';
import AdvancedFormattedMessage from '../../AdvancedFormattedMessage';
import { lang } from '../../../constants';
import methodologyKeywordEN1 from '../../../../public/images/KeywordMethodology1_EN_480w.png';
import methodologyKeywordEN2 from '../../../../public/images/KeywordMethodology2_EN_480w.png';
import methodologyKeywordEN3 from '../../../../public/images/KeywordMethodology3_EN_480w.png';
import methodologyKeywordEN4 from '../../../../public/images/KeywordMethodology4_EN_480w.png';
import methodologyKeywordEN5 from '../../../../public/images/KeywordMethodology5_EN_480w.png';
import methodologyKeywordEN6 from '../../../../public/images/KeywordMethodology6_EN_480w.png';
import methodologyKeywordFR1 from '../../../../public/images/KeywordMethodology1_FR_480w.png';
import methodologyKeywordFR2 from '../../../../public/images/KeywordMethodology2_FR_480w.png';
import methodologyKeywordFR3 from '../../../../public/images/KeywordMethodology3_FR_480w.png';
import methodologyKeywordFR4 from '../../../../public/images/KeywordMethodology4_FR_480w.png';
import methodologyKeywordFR5 from '../../../../public/images/KeywordMethodology5_FR_480w.png';
import methodologyKeywordFR6 from '../../../../public/images/KeywordMethodology6_FR_480w.png';
import './styles.scss';

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
    {lang === 'en'
      ? (
        <div className="KeywordExplanation">
          <img src={methodologyKeywordEN1} alt="KeywordMethodologyEN1" />
          <img src={methodologyKeywordEN2} alt="KeywordMethodologyEN2" />
          <img src={methodologyKeywordEN3} alt="KeywordMethodologyEN3" />
          <img src={methodologyKeywordEN4} alt="KeywordMethodologyEN4" />
          <img src={methodologyKeywordEN5} alt="KeywordMethodologyEN5" />
          <img src={methodologyKeywordEN6} alt="KeywordMethodologyEN6" />
        </div>
      )
      : (
        <div className="KeywordExplanation">
          <img src={methodologyKeywordFR1} alt="KeywordMethodologyFR1" />
          <img src={methodologyKeywordFR2} alt="KeywordMethodologyFR2" />
          <img src={methodologyKeywordFR3} alt="KeywordMethodologyFR3" />
          <img src={methodologyKeywordFR4} alt="KeywordMethodologyFR4" />
          <img src={methodologyKeywordFR5} alt="KeywordMethodologyFR5" />
          <img src={methodologyKeywordFR6} alt="KeywordMethodologyFR6" />
        </div>
      )
    }

  </div>
);

export default MethodologyBox;
