import React from 'react';
import './styles.scss';
import { injectIntl, intlShape } from 'react-intl';

const TotalConditionsLabel = (props) => {
  const { intl } = props;
  return (
    <div className="TotalConditionsLabel">
      <svg className="conditionLabel" height="60" width="100">
        <text x="0" y="12" className="small">{intl.formatMessage({ id: 'components.totalConditionsLabel.total' })}</text>
        <text x="0" y="24" className="small">{intl.formatMessage({ id: 'components.totalConditionsLabel.forProject' })}</text>
        <line x1="1.5" y1="25" x2="1.5" y2="60" className="connectingLine" />
      </svg>
    </div>
  );
};

TotalConditionsLabel.propTypes = {
  /** For translations */
  intl: intlShape.isRequired,
};

export default injectIntl(TotalConditionsLabel);
