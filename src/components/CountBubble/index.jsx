import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AdvancedFormattedMessage from '../AdvancedFormattedMessage';
import './styles.scss';

const CountBubble = ({ count, textId }) => {
  // Use the singular when necessary
  const id = (count > 1 || count === 0) ? textId : textId.slice(0, -1);

  return (
    <div className="CountBubble">
      <span className={classNames('count', { small: count > 999 })}>{count}</span>
      <span className="text">
        &nbsp;
        <AdvancedFormattedMessage id={`components.greyPipe.countBubble.${id}`} />
      </span>
    </div>
  );
};

CountBubble.propTypes = {
  count: PropTypes.number.isRequired,
  /** Id for localized text; will be appended to "components.greyPipe.countBubble.___" */
  textId: PropTypes.string.isRequired,
};

export default CountBubble;
