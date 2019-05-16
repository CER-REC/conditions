import React from 'react';
import './styles.scss';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';

const TotalConditionsLabel = (props) => {
  const { intl } = props;
  const { className } = props;
  return (
    <div className={className}>
      <svg className="TotalConditionsForProject" height="100" width="100">
        <text x="0" y="12" className="small">{intl.formatMessage({ id: 'components.totalConditionsLabel.total' })}</text>
        <text x="0" y="24" className="small">{intl.formatMessage({ id: 'components.totalConditionsLabel.forProject' })}</text>
        <line x1="2" y1="28" x2="2" y2="100" className="connectingLine" />
      </svg>
    </div>
  );
};
TotalConditionsLabel.propTypes = {
  /** For translations */
  intl: intlShape.isRequired,
  className: PropTypes.string,
};
TotalConditionsLabel.defaultProps = {
  className: 'default',
};
export default injectIntl(TotalConditionsLabel);
