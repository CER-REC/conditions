import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import BrowseByBtn from './BrowseByBtn';

import './styles.scss';

const BrowseBy = ({ showArrow, labelId, setBrowseBy }) => (
  <div className="BrowseBy">
    <div className={classNames('arrowWrapper', { showArrow, zeroWidth: (labelId === 'blank') })}>
      <FormattedMessage id={`components.browseBy.${labelId}`}>
        {text => <span className="label">{text}</span>}
      </FormattedMessage>
    </div>
    <BrowseByBtn classNames="company" mode="company" onClick={setBrowseBy} />
    <BrowseByBtn classNames="location" mode="location" onClick={setBrowseBy} />
  </div>
);

BrowseBy.propTypes = {
  showArrow: PropTypes.bool,
  labelId: PropTypes.oneOf(['skip', 'return', 'blank']),
  setBrowseBy: PropTypes.func.isRequired,
};

BrowseBy.defaultProps = {
  showArrow: false,
  labelId: '',
};

export default BrowseBy;
