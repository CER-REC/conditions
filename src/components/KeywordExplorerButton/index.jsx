import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';
import handleInteraction from '../../utilities/handleInteraction';
import AdvancedFormattedMessage from '../AdvancedFormattedMessage';

// eslint-disable-next-line react/prop-types
const TranslatedParagraphs = ({ children }) => children
  .split('\n')
  .map((line, i) => <p key={i}>{line}</p>); // eslint-disable-line react/no-array-index-key

const KeywordExplorerButton = props => (
  <div className="KeywordExplorerButton" {...handleInteraction(props.onClick)}>
    <div className="buttonText">
      <svg className="keywordExplorerCircle">
        <circle cx="18" cy="14" r="12" />
      </svg>
      <span className="descriptionText">
        <AdvancedFormattedMessage
          id="components.keywordExploreButton.description"
          tag={TranslatedParagraphs}
        />
      </span>
    </div>
  </div>
);

export default KeywordExplorerButton;

KeywordExplorerButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
