import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import './styles.scss';
import handleInteraction from '../../utilities/handleInteraction';

const KeywordExplorerButton = props => (
  <div className="KeywordExplorerButton" {...handleInteraction(props.onClick)}>
    <div className="buttonText">
      <svg className="keywordExplorerCircle">
        <circle cx="18" cy="14" r="12" />
      </svg>
      <FormattedMessage id="components.keywordExploreButton.description">
        {text => (
          <span className="descriptionText">
            {text.split('\n').map(string => (
              <p key={string}>{string}</p>
            ))}
          </span>
        )}
      </FormattedMessage>
    </div>
  </div>
);

export default KeywordExplorerButton;

KeywordExplorerButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
