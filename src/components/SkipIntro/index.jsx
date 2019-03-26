import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import './styles.scss';

const SkipIntro = ({ showArrow }) => (
  <FormattedMessage id="views.view1.footer.skip">
    {text => <span className={classNames('SkipIntro', { showArrow })}>{text}</span>}
  </FormattedMessage>
);

SkipIntro.propTypes = {
  showArrow: PropTypes.bool,
};

SkipIntro.defaultProps = {
  showArrow: false,
};

export default SkipIntro;
