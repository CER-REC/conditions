import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import './styles.scss';

const CountBubble = ({ count, textId, className }) => (
  <div className={classNames('CountBubble', className)}>
    <span className="count">{count}</span>
    <FormattedMessage id={`components.greyPipe.countBubble.${textId}`}>
      {text => <span className="text">&nbsp;{text}</span>}
    </FormattedMessage>
  </div>
);

CountBubble.propTypes = {
  count: PropTypes.number.isRequired,
  /** Id for localized text; will be appended to |components.greyPipe.countBubble.___" */
  textId: PropTypes.string.isRequired,
  className: PropTypes.string,
};

CountBubble.defaultProps = {
  className: '',
};

export default CountBubble;
