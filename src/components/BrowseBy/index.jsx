import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { browseByType } from '../../proptypes';
import BrowseByBtn from './BrowseByBtn';
import AdvancedFormattedMessage from '../AdvancedFormattedMessage';

import './styles.scss';

const BrowseBy = ({ showArrow, labelId, browseBy, onClick }) => (
  <div className="BrowseBy">
    <div className={classNames('arrowWrapper', { showArrow, zeroWidth: (labelId === 'blank') })}>
      <AdvancedFormattedMessage id={`components.browseBy.${labelId}`} className="browseLabel" />
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

export default React.memo(BrowseBy);
