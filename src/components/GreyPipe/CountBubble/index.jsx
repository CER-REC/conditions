import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import './styles.scss';

const CountBubble = ({ count, textId }) => {
  // Use the singular when necessary
  const id = (count > 1) ? textId : textId.slice(0, -1);

  return (
    <div className="CountBubble">
      <span className={classNames('count', { small: count > 999 })}>{count}</span>
      <FormattedMessage id={`components.greyPipe.countBubble.${id}`}>
        {text => <span className="text">&nbsp;{text}</span>}
      </FormattedMessage>
    </div>
  );
};

CountBubble.propTypes = {
  count: PropTypes.number.isRequired,
  /** Id for localized text; will be appended to "components.greyPipe.countBubble.___" */
  textId: PropTypes.string.isRequired,
};

export default CountBubble;
