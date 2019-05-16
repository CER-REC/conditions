import React from 'react';
import './styles.scss';
import { injectIntl, intlShape } from 'react-intl';

const TotalConditionsLabel = (props) => {
  const { intl } = props;

  return (
    <svg className="TotalConditionsForProject" height="100" width="100">
      <text x="0" y="12" className="small">{intl.formatMessage({ id: 'components.totalConditionsLabel.total' })}</text>
      <text x="0" y="24" className="small">{intl.formatMessage({ id: 'components.totalConditionsLabel.forProject' })}</text>
      <line x1="2" y1="28" x2="2" y2="100" className="connectingLine" />
    </svg>
  );
};
TotalConditionsLabel.propTypes = {
  /** For translations */
  intl: intlShape.isRequired,
};

export default injectIntl(TotalConditionsLabel);
