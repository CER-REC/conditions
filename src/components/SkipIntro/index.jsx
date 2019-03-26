import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import './styles.scss';

const SkipIntro = ({ className }) => (
  <div className={classNames('SkipIntro', className)}>
    <FormattedMessage id="views.view1.footer.skip" />
  </div>
);

SkipIntro.propTypes = {
  className: PropTypes.string,
};

SkipIntro.defaultProps = {
  className: '',
};

export default SkipIntro;
