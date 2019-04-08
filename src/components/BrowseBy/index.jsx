import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import BrowseByBtn from './BrowseByBtn';

import './styles.scss';

const noop = () => {};

const BrowseBy = ({ showArrow, labelId }) => (
  <div className="BrowseBy">
    <div className={classNames('arrowWrapper', { showArrow, zeroWidth: (labelId === 'blank') })}>
      <FormattedMessage id={`components.browseBy.${labelId}`}>
        {text => <span className="label">{text}</span>}
      </FormattedMessage>
    </div>
    <BrowseByBtn classNames="company" mode="company" onClick={noop} />
    <BrowseByBtn classNames="location" mode="location" onClick={noop} />
  </div>
);

BrowseBy.propTypes = {
  showArrow: PropTypes.bool,
  labelId: PropTypes.oneOf(['skip', 'return', 'blank']),
};

BrowseBy.defaultProps = {
  showArrow: false,
  labelId: '',
};

export default BrowseBy;
