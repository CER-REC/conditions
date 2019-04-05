import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import BrowseByBtn from './BrowseByBtn';

import './styles.scss';

const noop = () => {};

const BrowseBy = ({ showArrow, labelId }) => (
  <div className="BrowseBy">
    {
      (labelId !== '')
        ? (
          <FormattedMessage id={`components.browseBy.${labelId}`}>
            {text => <span className={classNames('label', { showArrow })}>{text}</span>}
          </FormattedMessage>
        )
        : (
          <span className={classNames('label', { showArrow })} />
        )
    }
    <BrowseByBtn classNames="company" mode="company" onClick={noop} />
    <BrowseByBtn classNames="location" mode="location" onClick={noop} />
  </div>
);

BrowseBy.propTypes = {
  showArrow: PropTypes.bool,
  labelId: PropTypes.oneOf(['skip', 'return', '']),
};

BrowseBy.defaultProps = {
  showArrow: false,
  labelId: '',
};

export default BrowseBy;
