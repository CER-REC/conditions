import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Icon from '../../Icon';
import CircleContainer from '../../CircleContainer';

library.add(
  faAngleRight,
);

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
    <CircleContainer onClick={props.onClick} size={15} backgroundColor="red">
      <Icon icon="angle-right" />
    </CircleContainer>
  </div>
);

SuggestedKeywords.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SuggestedKeywords;
