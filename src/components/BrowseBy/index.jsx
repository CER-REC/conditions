import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { browseByType } from '../../proptypes';
import BrowseByBtn from './BrowseByBtn';

import './styles.scss';

const BrowseBy = ({ showArrow, labelId, browseBy, onClick }) => (
  <div className="BrowseBy">
    <div className={classNames('arrowWrapper', { showArrow, zeroWidth: (labelId === 'blank') })}>
      <FormattedMessage id={`components.browseBy.${labelId}`}>
        {text => <span className="browseLabel">{text}:</span>}
      </FormattedMessage>
    </div>
    <BrowseByBtn classNames={(browseBy === 'company') ? 'inactive' : 'active'} mode="company" onClick={onClick} />
    <BrowseByBtn classNames={(browseBy === 'location') ? 'inactive' : 'active'} mode="location" onClick={onClick} />
  </div>
);

BrowseBy.propTypes = {
  showArrow: PropTypes.bool,
  labelId: PropTypes.oneOf(['skip', 'return', 'blank']),
  onClick: PropTypes.func.isRequired,
  browseBy: browseByType.isRequired,
};

BrowseBy.defaultProps = {
  showArrow: false,
  labelId: '',
};

export default BrowseBy;
