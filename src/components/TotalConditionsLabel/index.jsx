import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { injectIntl, intlShape } from 'react-intl';
import { handleAnalyticsInteraction } from '../../utilities/analyticsReporting';

const TotalConditionsLabel = props => (
  <div className="TotalConditionsLabel">
    <button
      type="button"
      className="openDetails"
      {...handleAnalyticsInteraction('total conditions popup', '', props.openNumberDetails)}
    >
      <svg className="conditionLabel" height="60">
        <text x="0" y="12" className="small">
          {props.intl.formatMessage({ id: 'components.totalConditionsLabel.total' })}
        </text>
        <text x="0" y="24" className="small">
          {props.intl.formatMessage({ id: 'components.totalConditionsLabel.forProject' })}
        </text>
        <text x="0" y="36" className="small linked">
          {props.intl.formatMessage({ id: 'components.totalConditionsLabel.learnMore' })}
        </text>
        <line x1="0" y1="40" x2="0" y2="60" className="connectingLine" />
      </svg>
    </button>
  </div>
);

TotalConditionsLabel.propTypes = {
  /** For translations */
  intl: intlShape.isRequired,
  openNumberDetails: PropTypes.func.isRequired,
};

export default injectIntl(React.memo(TotalConditionsLabel));
