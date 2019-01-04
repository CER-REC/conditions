import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.scss';

const Icon = props => (
  <div className="Icon">
    <FontAwesomeIcon
      icon={[props.prefix, props.icon]}
      className={props.className}
      size={props.size}
      color={props.color}
    />
  </div>);

Icon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  prefix: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
};

Icon.defaultProps = {
  className: '',
  prefix: 'fas',
  size: null,
  color: '',
};
export default Icon;
