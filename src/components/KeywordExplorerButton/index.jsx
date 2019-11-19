import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import './styles.scss';
import { handleAnalyticsInteraction } from '../../utilities/analyticsReporting';

const KeywordExplorerButton = props => (
  <div className="KeywordExplorerButton" {...handleAnalyticsInteraction('menu', 'back to keywords', props.onClick)}>
    <div className="buttonText">
      <svg className="keywordExplorerCircle">
        <circle cx="13" cy="13" r="12" />
      </svg>
      <p className="descriptionText">
        <FormattedMessage id="components.keywordExploreButton.description" />
      </p>
    </div>
  </div>
);

KeywordExplorerButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default React.memo(KeywordExplorerButton);
