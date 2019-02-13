import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import handleInteraction from '../../../utilities/handleInteraction';

const SuggestedKeywords = props => (
  <div className="SuggestedKeywords">
    <FormattedMessage id="components.searchBar.suggestedKeywords.selectFrom">
      {text => (<span className="selectFrom">{text}<br /></span>)}
    </FormattedMessage>
    <FormattedMessage id="components.searchBar.suggestedKeywords.suggestedKeywords">
      {text => (
        <span>
          {text.split('\n')
            .map(string => <span className="colorChange" key={string}>{string}<br /></span>)}
        </span>
      )}
    </FormattedMessage>
    <svg className="arrow" {...handleInteraction(props.onClick)} viewBox="0 0 427.5 427.5" width={20} height={20}>
      <circle fill="#CF167B" cx="215" cy="213.8" r="213.8" />
      <polygon fill="#FFFFFF" points="175.6,125.5 158,144.3 251.1,230.8 158,317.3 175.6,336.1 288.9,230.8 " />
    </svg>
  </div>
);

SuggestedKeywords.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SuggestedKeywords;
